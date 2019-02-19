const childProc = require('child_process');

console.log('launching child');
let child = childProc.spawn('./dist/test-linux-x64/test', [], {
  stdio: [0, 1, 2, 'ipc'] // Remove the last element of this array to see the
                          // browserWindows load properly, but IPC won't work
});

setTimeout(()=> {
  console.log('killing child');
  child.kill('SIGINT');
}, 20000);

// This doesn't work without IPC flag in STDIO option for childproc.spawn.
child.on('message', (msg) => {
  console.log('message from child: ' + msg);
});
