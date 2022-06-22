import MeetupDetail from '../../components/meetups/MeetupDetail';
import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';

const MeetupDetails = (props) => {
	return (
		<>
			<Head>
				<title>{props.meetupData.title}</title>
				<meta name='description' content={props.meetupData.description} />
			</Head>
			<MeetupDetail
				image={props.meetupData.image}
				title={props.meetupData.title}
				address={props.meetupData.address}
				discription={props.meetupData.description}
			/>
		</>
	);
};

export async function getStaticPaths() {
	const client = await MongoClient.connect(
		'mongodb+srv://yourOwnUrlClusterConnection',
	);
	const db = client.db();

	const meetupCollection = db.collection('meetups');
	//return the meetups filtered by id
	const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();

	client.close();
	return {
		fallback: 'blocking',
		paths: meetups.map((meetup) => ({
			params: { meetupId: meetup._id.toString() },
		})),
	};
}

export async function getStaticProps(context) {
	const meetupId = context.params.meetupId;

	const client = await MongoClient.connect(
		'mongodb+srv://richard:9a08851G56Beex4E@cluster0.a4yla.mongodb.net/?retryWrites=true&w=majority',
	);
	const db = client.db();

	const meetupCollection = db.collection('meetups');
	//return the meetups filtered by id
	const selectedMeetup = await meetupCollection.findOne({
		_id: ObjectId(meetupId),
	});

	client.close();

	console.log(meetupId);

	return {
		props: {
			meetupData: {
				id: selectedMeetup._id.toString(),
				title: selectedMeetup.title,
				address: selectedMeetup.address,
				description: selectedMeetup.description,
				image: selectedMeetup.image,
			},
		},
	};
}

export default MeetupDetails;
