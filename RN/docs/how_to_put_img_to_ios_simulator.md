## How to put image to ios simulator

You can use the command line to copy files to the iOS Simulator. First, locate the UUID of the simulator, then copy the file.

1. Get the Simulator UUID:

```bash
xcrun simctl list
```

Find the UUID of the simulator you're using.

2. Copy the Image:

```bash
xcrun simctl addmedia <Simulator-UUID> /path/to/your/image.png
```

Replace <Simulator-UUID> with the UUID of your simulator and /path/to/your/image.png with the path to your image file.

This command adds the image to the Photos app on the iOS Simulator.
