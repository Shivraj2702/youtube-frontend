import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NoVideosFound, VideoList } from "../components";
import HomeSkeleton from "../Skelton/HomeSkelton";
import { getAllVideos, makeVideosNull } from "../store/Slice/videoSlice";
import { FaFilter } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useParams, useSearchParams } from "react-router-dom";

function SearchVideos() {
    const dispatch = useDispatch();
    const { query } = useParams();
    const [filterOpen, setFilterOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const sortType = searchParams.get("sortType");
                const sortBy = searchParams.get("sortBy");
                await dispatch(getAllVideos({ query, sortBy, sortType }));
                setFilterOpen(false);
            } catch (error) {
                console.error("Error fetching videos:", error);
                // Handle error appropriately (e.g., show error message to user)
            }
        };
        fetchVideos();
        return () => dispatch(makeVideosNull());
    }, [dispatch, query, searchParams]);

    const handleSortParams = (newSortBy, newSortType = "asc") => {
        setSearchParams({ sortBy: newSortBy, sortType: newSortType });
    };

    const loading = useSelector((state) => state.video?.loading);
    const videos = useSelector((state) => state.video?.videos);
    console.log(videos)

    if (loading) {
        return <HomeSkeleton />;
    }

    if (videos?.totalDocs === 0) {
        return <NoVideosFound text={"Try searching something else"} />;
    }

    return (
        <>
            <div
                className="w-full h-10 flex items-center font-bold justify-end cursor-pointer px-8"
                onClick={() => setFilterOpen((prev) => !prev)}
            >
                <span className="text-white hover:text-purple-500">
                    Filters
                </span>
                <FaFilter
                    size={20}
                    className="text-purple-500 hover:text-purple-800"
                />
            </div>
            {filterOpen && (
                <div className="w-full absolute bg-transparent">
                    <div className="max-w-sm border border-slate-800 rounded bg-[#222222] fixed mx-auto z-50 inset-x-0 h-96 p-5">
                        <h1 className="font-semibold text-lg">Search filters</h1>
                        <IoCloseCircleOutline
                            size={25}
                            className="absolute right-5 top-5 cursor-pointer"
                            onClick={() => setFilterOpen((prev) => !prev)}
                        />
                        <table className="mt-4">
                            <tbody>
                                <tr className="w-full text-start border-b">
                                    <th>SortBy</th>
                                </tr>
                                <tr className="flex flex-col gap-2 text-slate-400 cursor-pointer">
                                    <td
                                        onClick={() =>
                                            handleSortParams("createdAt", "desc")
                                        }
                                    >
                                        Upload date{" "}
                                        <span className="text-xs">(Latest)</span>
                                    </td>
                                    {/* Other sorting options */}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            <div className="w-full text-white">
                <div className="grid h-screen xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 text-white overflow-y-scroll">
                    {videos?.docs?.map((video) => (
                        <VideoList
                            key={video?._id}
                            thumbnail={video?.thumbNail}
                            duration={video?.duration}
                            title={video?.title}
                            views={video?.views}
                            avatar={video?.ownerDetails?.avatar}
                            channelName={video?.ownerDetails?.username}
                            createdAt={video?.createdAt}
                            videoId={video?._id}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default SearchVideos;
