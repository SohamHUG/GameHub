import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import axios from "axios";
import { FC } from "react";

type Game = {
    id: number;
    name: string;
    background_image: string;
};

const fetchTrendingGames = async (): Promise<Game[]> => {
    const endDate = new Date().toISOString().split("T")[0];
    const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];

    const res = await axios.get(
        `https://api.rawg.io/api/games?key=${import.meta.env.VITE_RAWG_KEY}&dates=${startDate},${endDate}&ordering=-rating`
    );

    return res.data.results;
};

export const GameCarousel: FC = () => {
    const { data: games, isLoading, error } = useQuery<Game[]>({
        queryKey: ["trendingGames"],
        queryFn: fetchTrendingGames,
    });

    if (isLoading) {
        return <h1>Loading ....</h1>;
    }

    if (error) {
        return <p className="error">{error.message}</p>;
    }

    return (
        <>
            <div className="flex overflow-x-scroll">
                {games?.map((game, index) => (
                    <motion.div
                        // whileHover={{ scale: 1.05 }}
                        key={game.id}
                        initial={{ opacity: 0.8, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.2 }}
                        className="min-w-[300px] mx-4"
                    >
                        <img src={game.background_image} alt={game.name} />
                        <p>{game.name}</p>
                    </motion.div>
                ))}
            </div>
        </>
    )
}
