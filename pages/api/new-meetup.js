// /api/new-meetup
// POST /api/new-meetup

import { MongoClient } from 'mongodb';

async function handler(req, res) {
	if (req.method === 'POST') {
		const data = req.body;
        
        const client = await MongoClient.connect('mongodb+srv://richard:9a08851G56Beex4E@cluster0.a4yla.mongodb.net/?retryWrites=true&w=majority')
        const db = client.db()

        const meetupCollection = db.collection('meetups')

        const result = await meetupCollection.insertOne(data)
        
        console.log(result)

        client.close()

        res.status(201).json({message: 'Meetups Inserted!'})

	}
}

export default handler;
