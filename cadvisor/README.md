![#c5f015] Node.js Prometheus Metrics Integration with Cadvisor

This Node.js project demonstrates how to integrate Prometheus metrics into your application and track them in Grafana using Cadvisor. Cadvisor is a container monitoring tool that can be used to collect metrics about the performance and resource usage of your Node.js application.


![#c5f015] Prerequisites

Node.js installed on your system
Docker and Docker Compose for running Cadvisor, Prometheus, and Grafana.

![#c5f015] Getting Started

Clone this repository to your local machine.
Install the project dependencies by running the following command:

```npm install```

Start Cadvisor, Prometheus, and Grafana using Docker Compose:

```docker-compose up -d```

Verify that Node Server, Cadvisor, Prometheus, and Grafana are running by accessing the following URLs:

Node Server - http://localhost:5000 

Cadvisor - http://localhost:8080

Prometheus - http://localhost:9090

Grafana - http://localhost:3000


Start your Node.js application:

```node app.js```

Grafana Integration:

Log in using the default credentials (admin/admin).

Configure a new data source in Grafana:

Type: Prometheus

URL: http://prometheus:9090

Save the data source and create a new dashboard.

Add a new panel to the dashboard and configure it to display the metrics from Prometheus using PromQL queries.

Conclusion:

Congratulations! You have successfully integrated Prometheus metrics into your Node.js application and tracked them in Grafana using Cadvisor. You can now monitor and visualize the performance and resource usage of your application in real-time.

Feel free to customize and extend the metrics as per your application requirements and explore the various visualization options available in Grafana.

## 🔗 References
[Prometheus documentation](https://prometheus.io/docs/introduction/overview/)

[Grafana documentation](https://grafana.com/docs/)

[Cadvisor Reference](https://github.com/google/cadvisor)

