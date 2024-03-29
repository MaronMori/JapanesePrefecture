# 都道府県別総人口推移グラフアプリケーション
## 公開URL
[https://japanese-prefecture.vercel.app/]
## アプリケーション概要
RESAS APIを使用して都道府県のデータを取得しHighchartsでグラフ表示するアプリケーションです。
## 作成期間
4日
## 使用した技術と理由
### React
フロントエンドの勉強を始めたのがReactだったので使用しました。
### Next.js
ReactをUdemyで学んだ際に、Next.jsも学んだので利用しました。今までいくつかNext.jsで作成して、慣れていたのも理由の1つです。
### jest
Next.jsでテストをするならjestということで利用しました。
## 工夫したところ
都道府県を選択した時にAPIで人口データを取得するのですが、人口データの種類（年少人口、老年人口など）を分ける際にindex番号で切り替えれると気づいてので、ボタンを押してindex番号を変更し表示する人口データの種類を変更しました。
## 難しかったところ
テストの導入が初めてだったので難しかったです。特にTypeScriptの場合JestをTypeScriptでも認識させる必要があったので、Jestの設定に苦労しました。   
ESLintやPrettierの導入も初めてだったので苦戦しました。特にパッケージのバージョンの競合があってつまづきましたが、バージョンを下げて互換性を上げることにより対処できました。
## 今後の改善点
テスト機能をもっと細かいところまで実装するべきだと思っています。特にHighchartsのグラフのテストを行っていけたらいいと思います。