const express = require('express')
const graphqlHTTP = require('express-graphql')
const app = express()
const fetch = require('node-fetch')
const util = require('util')
const parseXML = util.promisify(require('xml2js').parseString)

const fetchAuthor = id => fetch(
	`https://www.goodreads.com/author/show.xml?id=${id}&key=FhFkbLoRCz4ZA6MQULiQ`
)
.then(response => response.text())
.then(parseXML)

// contains the types and the information for all the data
const schema = require('./schema')

app.use('/graphql', graphqlHTTP(req => {
	return { 
		schema,
		context: {
			fetchAuthor
		},
		graphiql: true
	}
}))

app.listen(4000)
console.log('Listening ... ')
