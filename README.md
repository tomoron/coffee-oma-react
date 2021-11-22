# Coffee-oma

コーヒーに関する器具や、豆などの評価や感想を投稿しシェアするwebアプリケーションです。

### [リンク]:https://coffee-oma.com
![coffee-oma-logo](https://user-images.githubusercontent.com/48266893/112326442-deefcb80-8cf7-11eb-9432-cc83ade690de.png)


[![Rails Rspec](https://github.com/tomoron/coffee-oma-react/actions/workflows/ruby.yml/badge.svg)](https://github.com/tomoron/coffee-oma-react/actions/workflows/ruby.yml)
[![Cypress](https://github.com/tomoron/coffee-oma-react/actions/workflows/cypress.yml/badge.svg)](https://github.com/tomoron/coffee-oma-react/actions/workflows/cypress.yml)


# 特に見ていただきたい点
- ### インフラ面
  - 開発環境ではdocker-composeを利用し、本番環境ではAWS(ECS Fargate)を利用している
  - CircleCIを利用し、CI/CDパイプラインを構築している
  - Terraformを使い、インフラをコード化している
- ### バックエンド面
  - action_mailer,active_job,active_cableを利用しているところ
  - DRY,KISS,YAGNIの原則を意識したコード
  - シンプルなUIになるようにしているところ
- ### その他
  - チーム開発を意識し、Github flowに従った開発手法を取り入れている点。

# 機能一覧
  - ユーザ機能(devise)
  - 投稿機能
  - 画像投稿機能(carrierwave, fog-aws)
  - 検索機能(ransack)
  - ページネーション機能(kaminari)
  - 無限スクロール機能
  - 投稿に対するレビュー機能
  - レビューに対しての通報機能(Active Job,Delayed_job)
  - お気に入り機能(STI)
  - 通知機能
  - DM機能(Action_Cable)
  - お問い合わせ機能(Action_Mailer)
  - フォロー機能
  - コーヒーの抽出レシピの投稿機能(豆のレビューに紐付け)
  - タグ機能(acts-as-taggable-on)
  - 管理者機能(activeadmin)
  - reCAPTCHA
  - 履歴機能
  - チャート機能
  - レート星機能

# 使用している技術一覧
  - Ruby 2.7.1
  - rails 6.0.3
  - AWS(VPC,ECR,ECS,RDS,Elasticache,ALB,VPCEndpoint,ACM, Route53,S3,SES,CloudWatch)
  - mysql 8.0
  - CircleCI 2.1
  - Docker 20.10.5, docker-compose 1.28.5
  - terraform 0.13
  - Rspec, Capybara, rubocop, selenium
  - jQuery
  - Nginx 1.19.4
  - puma


# ER図
![DB](https://user-images.githubusercontent.com/48266893/112306445-2750be80-8ce3-11eb-9680-7699a0091188.png)

# クラウドアーキテクチャー
![ポートフォリオクラウドアーキテクチャー](https://user-images.githubusercontent.com/48266893/112306305-05efd280-8ce3-11eb-8de1-6c3f666bb928.PNG)

