import { useEffect, useState } from "react";

export default function useFetchData(url, platformUrl = null) {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [platformsName, setPlatformsName] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Errore HTTP! Status: ${response.status}`);
                }
                const json = await response.json();
                setGames(json.results);
                if(platformUrl) {
                    const platformResponse = await fetch(platformUrl);
                    if (!platformResponse.ok) {
                        throw new Error(`Errore HTTP! Status: ${platformResponse.status}`);
                    }
                    const platformJson = await platformResponse.json();
                    setPlatformsName(platformJson.name);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, platformUrl]);

    return { games, loading, error, platformsName };
}
