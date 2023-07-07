import { NextFunction, Request, Response } from 'express';
import axios from 'axios';
import xlsx from 'xlsx';
require('dotenv').config()
// const axios = require('axios');
// const reader  = require('xlsx');   
// const xlsx = require('xlsx'); 
const path = require('path');
import {
  createJobs,
  updateJobs
} from '../../modules/jobs/jobs.service';
import {
  createInspector,
  updateinspector
} from '../../modules/user/inspector.service';

import {Sentry} from '../../utilities/sentryError'

export class routePlanner{
    static getRoutePath = async(req,res,next) => {
        try {
          if (!req.file) {
            return res.status(400).send('No file uploaded');
          }
          const filePath = req.file.path;
          const fileExtension = req.file.originalname.split('.').pop().toLowerCase();
          let jobs; let inspector;
          if(fileExtension === 'xlsx') 
          {
            const excelFileBuffer = req.file.buffer;
            const workbook = xlsx.read(excelFileBuffer, { type: 'buffer' });
            const sheetNames = workbook.SheetNames;
            const worksheet = workbook.Sheets[sheetNames[0]];
            const sheet2 = workbook.Sheets[sheetNames[1]];
            const jsonData = xlsx.utils.sheet_to_json(worksheet);
            const sheetTwoData = xlsx.utils.sheet_to_json(sheet2);
            jobs = await this.JobDetailsData(jsonData); 
            inspector = await this.InspectorDetailsData(sheetTwoData); 
          }
         
          if(fileExtension === 'json')
          {
            const fileBuffer = req.file.buffer;
            const jsonData = JSON.parse(fileBuffer.toString());
            jobs = await this.JobDetailsData(jsonData.GetRouteOptimizationInspectionListResult[0].Inspections);
            inspector = await this.InspectorDetailsData(jsonData.GetRouteOptimizationInspectionListResult[0].Inspectors);  
          }
          // console.log(jobs);
          let location = [];
          jobs.forEach(async(element) =>{
            const newUser = await createJobs({
              job_locations : element.location,
              address : element.description
            
          });
          }) 
          
          inspector.forEach(async(element) => {
            const newInspector = await createInspector({
              currentLocation : element.location,
              name : element.description
            
          });
          // console.log(newUser,"isUpdated")
          })
          
          let inputData = {
            jobs : jobs,
            vehicles : inspector,
            options: {
              g: true
            },
            shipments: []
          }
          
          let config = {
            method: 'post',
            url: process.env.APIURL,
            headers: {
              'Content-Type': 'application/json'
            },
            data: JSON.stringify(inputData)
          };
          const result = await axios(config);
          
          res.send(result.data);

      }catch (err) {
          console.log(err);
          next(err);
        }  
      }

      static async testOne(req,res,next) {
        throw new Error('Intentional crash');
        // next()
        
      }
      
      
      static async InspectorDetailsData(Data)
      {
        const columnNames = Object.keys(Data[0]);
        let hitCount = 0
        const promises = Data.map(async (element) => {
          const inspectorName = element[columnNames[0]];
          const location = await axios.get(process.env.MAPAPI, {
            params: {
              address: element.Address,
              key: process.env.APIKEY
            }
          });
          if (location && location.data.results.length > 0) {
            const getlocation = location.data.results[0].geometry.location;
            const lat = getlocation.lat;
            const lng = getlocation.lng;
            hitCount++
            // console.log(hitCount);
            return {
              start: [lat, lng],
              end: [lat, lng],
              description: inspectorName,
              id: hitCount,
              capacity: [5],
              skills: [1, 5],
              time_window: [0, 28800]
            }
          }
          return null;
        })
        const results = await Promise.all(promises);
        return results.filter((result) => result !== null);
      }
      
      
      static async JobDetailsData(Data) {
        let hitCount = 0
        const promises = Data.map(async (element) => {
          let result = null;
          // console.log(element.Address);
          if (element.Address) {
            const getLocation = await axios.get(process.env.MAPAPI, {
              params: {
                address: element.Address,
                key: process.env.APIKEY
              }
            });
            
            if (getLocation && getLocation.data.results.length > 0) {
              const location = getLocation.data.results[0].geometry.location;
              const lat = location.lat;
              const lng = location.lng;
              hitCount++
              result = {
                description: element.Address,
                id: hitCount,
                delivery: [1],
                skills: [1],
                location: [lng, lat],
                service: 1800
              };
            }
          }
      
          return result;
        });
      
        const results = await Promise.all(promises);
        return results.filter((result) => result !== null);
      }

}

exports.modules = routePlanner;