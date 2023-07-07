import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:sentry_flutter/sentry_flutter.dart';
import 'dart:io';
import 'package:stack_trace/stack_trace.dart';

void main() async {
  await SentryFlutter.init(
    (options) {
      // options.dsn =
      //     'https://89572cde74944acf8dcfabd1a1aa080c@o4505441023688704.ingest.sentry.io/4505470630166528';
      options.dsn =
          'https://789ed1881c3747c48441bc5cd8f55962@o4505486496628736.ingest.sentry.io/4505486571470848';
      // // Additional configuration options can be set here
    },
    appRunner: () => runApp(const MyApp()),
  );

  Sentry.configureScope((scope) {
    // Get the current file path and filename
    var stackFrames = Trace.current().frames;
    if (stackFrames.isNotEmpty) {
      var currentFrame = stackFrames.first;
      var currentFile = currentFrame.uri.toString();
      var currentFilename = currentFrame.member;

      // Set the current file path and filename as tags
      scope.setTag('currentFilePath', currentFile);
    }
  });

// Capture an event or throw an exception
// ...
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key});
  void _crashApp() {
    throw Exception('This is a deliberate crash!');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Crash Example'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text(
              'Press the button to crash the app:',
            ),
            ElevatedButton(
              onPressed: () {
                // Capture the custom tag with dynamic value

                // Capture an exception with the custom tag
                try {
                  throw Exception('This is a deliberate crash!');
                } catch (error, stackTrace) {
                  Sentry.captureException(
                    error,
                    stackTrace: stackTrace,
                  );
                }
              },
              child: const Text('Crash App'),
            ),
          ],
        ),
      ),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title});

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      // This call to setState tells the Flutter framework that something has
      // changed in this State, which causes it to rerun the build method below
      // so that the display can reflect the updated values. If we changed
      // _counter without calling setState(), then the build method would not be
      // called again, and so nothing would appear to happen.
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    // This method is rerun every time setState is called, for instance as done
    // by the _incrementCounter method above.
    //
    // The Flutter framework has been optimized to make rerunning build methods
    // fast, so that you can just rebuild anything that needs updating rather
    // than having to individually change instances of widgets.
    return Scaffold(
      appBar: AppBar(
        // Here we take the value from the MyHomePage object that was created by
        // the App.build method, and use it to set our appbar title.
        title: Text(widget.title),
      ),
      body: Center(
        // Center is a layout widget. It takes a single child and positions it
        // in the middle of the parent.
        child: Column(
          // Column is also a layout widget. It takes a list of children and
          // arranges them vertically. By default, it sizes itself to fit its
          // children horizontally, and tries to be as tall as its parent.
          //
          // Invoke "debug painting" (press "p" in the console, choose the
          // "Toggle Debug Paint" action from the Flutter Inspector in Android
          // Studio, or the "Toggle Debug Paint" command in Visual Studio Code)
          // to see the wireframe for each widget.
          //
          // Column has various properties to control how it sizes itself and
          // how it positions its children. Here we use mainAxisAlignment to
          // center the children vertically; the main axis here is the vertical
          // axis because Columns are vertical (the cross axis would be
          // horizontal).
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text(
              'You have pushed the button this many times:',
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}
