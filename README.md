# Pluzo

Pluzo is a React Native app currently targeting iOS and Android.
Pluzo is built with yarn 1.13.0, node v14.4.0 and CocoaPods v1.8.4

## Install

You will need Node, Yarn, Watchman, React Native CLI, Xcode 11.4.1 (11E503a), and CocoaPods.

### Node, Yarn, Watchman

We recommend installing Node, Yarn, and Watchman using Homebrew. Run the following commands in a Terminal after installing Homebrew:

```sh
$ brew install node
$ brew install yarn --without-node
$ brew install watchman
```

If you have already installed Node on your system, make sure it is Node 8.3 or newer.

### Xcode

The easiest way to install Xcode is via the Mac App Store. Installing Xcode will also install the iOS Simulator and all the necessary tools to build your iOS app.

If you have already installed Xcode on your system, make sure it is version 9.4 or newer.

#### Command Line Tools

You will also need to install the Xcode Command Line Tools. Open Xcode, then choose "Preferences..." from the Xcode menu. Go to the Locations panel and install the tools by selecting the most recent version in the Command Line Tools dropdown.

### CocoaPods

CocoaPods is built with Ruby and is installable with the default Ruby available on macOS. We recommend you use the default ruby.

```sh
$ sudo gem install cocoapods
```

### Dependencies

Run the following commands in a Terminal at root of source directory:

```sh
$ yarn
$ cd ios
$ pod install
```

## Configure

Place `.env.development` file at root of source directory.

## Run

Run the following command in a Terminal at root of source directory:

```sh
$ npx react-native run-ios
```
