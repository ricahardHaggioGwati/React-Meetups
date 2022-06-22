import { MongoClient } from 'mongodb'
import Head from 'next/dist/shared/lib/head';

import MeetupList from '../components/meetups/MeetupList';

//Enter your own mongodb connection string here
const ConnectionUrl = ''

const HomePage = (props) => {
	return <>
		<Head>
			<title>Meetups</title>
			<meta name='description' content='view our mazing list of locations' />
		</Head>
	<MeetupList meetups={props.meetups} />;
	</>
};

// export async function getServerSideProps(context) {
// 	const req = context.req
// 	const res = context.res

// 	//fetch data from api

// 	return {
// 		props: {
// 			meetups: DUMMY_DATA
// 		}
// 	}
// }

//Runs firts on build, has to return an {} withs a props key
//revalidate how often the page should rerender for incoming data

export async function getStaticProps() {
	//fetch data from api
	const client = await MongoClient.connect(ConnectionUrl)
	const db = client.db()

	const meetupCollection = db.collection('meetups')

	const meetups = await meetupCollection.find().toArray()

	client.close()
	return {
		props: {
			meetups: meetups.map(meetup => ({
				title: meetup.title,
				address: meetup.address,
				image: meetup.image,
				id: meetup._id.toString()
			})),
		},
		revalidate: 1,
	};
}

export default HomePage;
