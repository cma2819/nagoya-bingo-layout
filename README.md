# nagoya-fes-layout

名古屋RTA用NodeCGのbundleです。

## Requirements

- NodeCG: ^1.6.0
- Node.js: 12.x or later is recommended

## Installation

NodeCGの`bundles`フォルダ内でコマンドを実行してください。

```
$ git clone https://github.com/cma2819/nagoya-fes-layout.git
$ cd nagoya-fes-layout
$ npm install --production

# or

$ nodecg install cma2819/nagoya-fes-layout
```

本bundleの実行には以下のbundleが必要です。

- [cma2819/nodecg-speedcontrol](https://github.com/cma2819/nodecg-speedcontrol)
- [speedcontrol-additions](https://github.com/cma2819/speedcontrol-additions)
- [nodecg-twitter-widget](https://github.com/cma2819/nodecg-twitter-widget)

それぞれをNodeCGにインストールしてください。

```
$ nodecg install cma2819/nodecg-speedcontrol
$ nodecg install cma2819/speedcontrol-additions
$ nodecg install cma2819/nodecg-twitter-widget
```

## Run

```
$ npm start
# or
$ nodecg start
```

## Assets

背景画像はassetsから設定できます。本bundle内には同梱していません。
