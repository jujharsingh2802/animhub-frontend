import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideos, makeVideosNull } from "../store/Slices/video.slice.js";
import { Container } from "../components/index.js";
import InfiniteScroller from "react-infinite-scroll-component";
import AllVideos from "../components/AllVideos.jsx";
import HomeSkeleton from "../skeletons/HomeSkeleton.jsx";

function Home() {
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.video.videos.data);
  const loading = useSelector((state) => state.video.loading);

  const hasNextPage = useSelector((state) => state.video.videos.hasNextPage);

  let [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if(page === 0) {
      dispatch(getAllVideos({ page: 1, limit: 10 }));
      page = 1;
    }
    return () => dispatch(makeVideosNull());
  },[dispatch]);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  const fetchMoreVideos = useCallback(() => {
    if (hasNextPage) {
      dispatch(getAllVideos({ page: page + 1, limit: 10 }))
        .then(setPage((prev) => prev + 1))
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }, [page, hasNextPage, dispatch]);

  return (
    <Container>
      <InfiniteScroller 
        dataLength = {videos?.length || 0}
        next = {fetchMoreVideos}
        loader = {isLoading && <HomeSkeleton />}
        scrollableTarget = "scrollable-container"
        hasNextPage
        endMessage = {"You Reached the End!!"}
       >
        <div className=" text-white mb-20 sm:m-0 max-h-screen w-full grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 overflow-y-scroll" id = "scrollable-container"> 
          {
            videos?.map(video => (
              <AllVideos
                key={video._id}
                thumbnail={video.thumbnail}
                title={video.title}
                duration={video.duration}
                avatar={video.ownerDetails.avatar }
                views={video.views}
                channelName={video.ownerDetails.username}
                videoId={video._id}
                createdAt={video.createdAt}
              />
            ))
          }
        </div>
      </InfiniteScroller>
    </Container>
  );
}

export default Home;
