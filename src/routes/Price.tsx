import { useQuery } from "react-query";
import ApexChart from "react-apexcharts";
import { fetchChartHistory } from "../api";
import { Helmet } from "react-helmet";
import { isDarkAtom } from "../atoms";

interface IChartProps {
	coinId: string;
}

interface IChartHistory {
	time_open: string;
	time_close: string;
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
	market_cap: number;
}

function Price({ coinId }: IChartProps) {
	const { isLoading, data } = useQuery<IChartHistory[]>(
		["priceHistory", coinId],
		() => fetchChartHistory(coinId),
		{
			refetchInterval: 10000,
		}
	);

	const date = data?.map((date) => new Date(date.time_close));
	const open = data?.map((price) => price.open);
	const high = data?.map((price) => price.high);
	const low = data?.map((price) => price.low);
	const close = data?.map((price) => price.close);

	console.log(date);
	console.log(typeof date);
	console.log(open);
	console.log(open?.at(0));

	return (
		<div>
			<Helmet>
				<title>Coin Price</title>
			</Helmet>
			{isLoading ? (
				"Loading Chart..."
			) : (
				<ApexChart
					type="candlestick"
					options={{
						plotOptions: {
							candlestick: {
								colors: {
									upward: "#0ca2f8",
									downward: "#89f002",
								},
								wick: {
									useFillColor: true,
								},
							},
						},
						chart: {
							width: 500,
							height: 500,
							background: "transparent",
						},
						theme: {
							mode: isDarkAtom ? "dark" : "light",
						},
						title: { text: "Price Chart", align: "left" },
						xaxis: {
							type: "datetime",
							tooltip: {
								enabled: true,
							},
							tickAmount: 6,
						},
						yaxis: {
							decimalsInFloat: 2,
							tooltip: {
								enabled: true,
							},
							tickAmount: 5,
						},
						tooltip: {
							y: {
								formatter: (value) => `$${value.toFixed(2)}`,
							},
						},
					}}
					series={[
						{
							data: [
								{
									x: date?.at(0),
									y: [open?.at(0), high?.at(0), low?.at(0), close?.at(0)],
								},
								{
									x: date?.at(1),
									y: [open?.at(1), high?.at(1), low?.at(1), close?.at(1)],
								},
								{
									x: date?.at(2),
									y: [open?.at(2), high?.at(2), low?.at(2), close?.at(2)],
								},
								{
									x: date?.at(3),
									y: [open?.at(3), high?.at(3), low?.at(3), close?.at(3)],
								},
								{
									x: date?.at(4),
									y: [open?.at(4), high?.at(4), low?.at(4), close?.at(4)],
								},
								{
									x: date?.at(5),
									y: [open?.at(5), high?.at(5), low?.at(5), close?.at(5)],
								},
								{
									x: date?.at(6),
									y: [open?.at(6), high?.at(6), low?.at(6), close?.at(6)],
								},
								{
									x: date?.at(7),
									y: [open?.at(7), high?.at(7), low?.at(7), close?.at(7)],
								},
								{
									x: date?.at(8),
									y: [open?.at(8), high?.at(8), low?.at(8), close?.at(8)],
								},
								{
									x: date?.at(9),
									y: [open?.at(9), high?.at(9), low?.at(9), close?.at(9)],
								},
								{
									x: date?.at(10),
									y: [open?.at(10), high?.at(10), low?.at(10), close?.at(10)],
								},
								{
									x: date?.at(11),
									y: [open?.at(11), high?.at(11), low?.at(11), close?.at(11)],
								},
								{
									x: date?.at(12),
									y: [open?.at(12), high?.at(12), low?.at(12), close?.at(12)],
								},
								{
									x: date?.at(13),
									y: [open?.at(13), high?.at(13), low?.at(13), close?.at(13)],
								},
							],
						},
					]}
				/>
			)}
		</div>
	);
}

export default Price;
