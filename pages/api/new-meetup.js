// /api/new-meetup
// POST /api/new-meetup

import { MongoClient } from 'mongodb';

//Enter your own mongodb connection string here
const ConnectionUrl = ''

async function handler(req, res) {
	if (req.method === 'POST') {
		const data = req.body;
        
        const client = await MongoClient.connect(ConnectionUrl)
        const db = client.db()

        const meetupCollection = db.collection('meetups')

        const result = await meetupCollection.insertOne(data)
        
        console.log(result)

        client.close()

        res.status(201).json({message: 'Meetups Inserted!'})

	}
}

export default handler;
