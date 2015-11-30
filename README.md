![NodeSchool Toronto Logo](http://nodeschool.io/toronto/i/nodeschool-toronto-logo.svg)

### Development

We use [Jekyll](https://jekyllrb.com/) to build [http://nodeschool.io/toronto](http://nodeschool.io/toronto). If you want to run the site or develop it locally you'll have to install [Jekyll](https://github.com/jekyll/jekyll) and [Jekyll-Sitemap](https://github.com/jekyll/jekyll-sitemap).

`gem install jekyll`

`gem install jekyll-sitemap`

We pull in event information through the [Tito](http://tito.io) embed widget but all the attendees listed are pulled via the [Tito API](http://api.tito.io). In order to update the listing of attendees, you'll have:

- Request our Tito API key (ping @darcyclarke or @jeffjewiss)

- Create a `config.json` in the root with the following: `{ "key": "..." }`

- `npm install`

- `npm update-attendees`
