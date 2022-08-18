import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useState } from 'react'

export interface ParamsPageProps {
	query: any
	post: any
}

export default function ParamsPage({ query, post }: ParamsPageProps) {
	const router = useRouter()
	const [seconds, setSeconds] = useState(0)

	useEffect(() => {
		const intervalId = setInterval(() => {
			setSeconds((x: any) => {
				if (x > 60) clearInterval(intervalId)

				return x + 1
			})
		}, 1000)

		return () => clearInterval(intervalId)
	}, [])

	return (
		<div>
			<h1>Params Page</h1>

			<p>Time: {seconds}s</p>

			{/* <h2>Post detail</h2>
			<p>{post?.title}</p>
			<p>{post?.author}</p>
			<p>{post?.description}</p> */}
		</div>
	)
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	context.res.setHeader('Cache-Control', 's-maxage=5')
	await new Promise((res) => setTimeout(res, 3000))
	return {
		props: {
			query: context.query,
			post: {},
		},
	}
}
