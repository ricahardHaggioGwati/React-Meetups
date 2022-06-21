import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import Head from 'next/head';

const NewMeetPage = () => {
	const router = useRouter();

	const addMeetupHandler = async (meetupData) => {
		const response = await fetch('/api/new-meetup', {
			method: 'POST',
			body: JSON.stringify(meetupData),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const data = await response.json(); 

		console.log(data);
		router.replace('/');
	};

	return (
		<>
			<Head>
				<title>New meetup location💃</title>
				<meta name='description' content='add your own new location to the amazing list of locations' />
			</Head>
			<NewMeetupForm onAddMeetup={addMeetupHandler} />;
		</>
	);
};

export default NewMeetPage;
