# nature-remo-api

[Nature Remo Cloud API](https://developer.nature.global/) を利用して、家電を自動化するスクリプト。

開発やデプロイに関するコードは、`nature-remo-api` ディレクトリ以下で実行してください。

## 関数

- `nightBedRoomAirConditioner`: 夜間に自動でエアコンを動かす関数。暑かったら ON, 涼しくなったら OFF にする

## Env

```sh
touch env.json
```

```env.json
{
  "nightBedRoomAirConditioner": {
    "natureRemoAccessToken": "***",
    "airconId": "***",
    "deviceId": "***",
    "hot": 30,
    "cold": 25,
    "airTemperature": 27
  }
}
```

## Dev

ビルド後にローカルで Lambda 関数を実行。

```sh
npm start
```

## Deploy

ビルド後に関数を AWS　Lambda へデプロイ。

```sh
npm run deploy
```
