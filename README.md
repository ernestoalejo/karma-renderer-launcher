
karma-renderer-launcher
=======================

> Launcher for [renderer](https://github.com/ernestoalejo/renderer).


Installation
------------

The easiest way is to keep `karma-renderer-launcher` as a devDependency in your `package.json`.

```json
{
  "devDependencies": {
    "karma": "~0.10",
    "karma-renderer-launcher": "~0.1.0"
  }
}
```

You can simple do it by:

```bash
npm install karma-renderer-launcher --save-dev
```


Renderer requirements
---------------------

In Ubuntu you'll need these packages and symbolic link to make renderer work:

```shell
sudo apt-get install libgtk2.0 libnss3 libgconf-2-4 libasound2 libudev1
ln -sf /lib/$(arch)-linux-gnu/libudev.so.1 /lib/$(arch)-linux-gnu/libudev.so.0
```

Also if you don't have at least one graphical interface on (in Vagrant or Docker for example) you'll need to install and run the headless X server:

```shell
sudo apt-get install xvfb
(Xvfb :100 -ac &)
```


----

For more information on Karma see the [homepage](http://karma-runner.github.com).
