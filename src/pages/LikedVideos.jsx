import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Loading } from "../components/index.js";
import LikedVideoHeader from "../components/LikedVideoHeader.jsx";
import { getLikedVideos } from "../store/Slices/like.slice.js";
import { makeVideosNull } from "../store/Slices/video.slice.js";
import InfiniteScroll from "react-infinite-scroll-component";
import AllVideos from "../components/AllVideos.jsx";

function LikedVideos() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.like?.loading);
  const likedVideos = useSelector((state) => state.like?.likedVideos);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (page === 0) {
      dispatch(getLikedVideos({ page: 1, limit: 10 }));
      setPage(1);
    }

    return () => dispatch(makeVideosNull());
  }, [dispatch, page]);

  if (loading) return <Loading />;

  return (
    <Container>
      <LikedVideoHeader
        totalLikedVideos={likedVideos.length}
        thumbnail={likedVideos[0]?.likedVideo?.thumbnail}
      />

      <div id="scrollable-container">
        <InfiniteScroll
          dataLength={likedVideos?.length || 0}
          scrollableTarget="scrollable-container"
          endMessage={
            <p className="text-white text-center">
              The above were your liked Videos
            </p>
          }
          loader={loading ? <Loading /> : null}
        >
          <div className="text-white mb-20 sm:m-0 max-h-screen w-full grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 overflow-y-scroll">
            {likedVideos?.map(({ likedVideo }, index) => (
              <AllVideos
                key={likedVideo._id}
                thumbnail={likedVideo.thumbnail}
                title={likedVideo.title}
                duration={likedVideo.duration}
                views={likedVideo.views}
                channelName={likedVideo.ownerDetails?.username}
                videoId={likedVideo._id}
                createdAt={likedVideo.createdAt}
              />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </Container>
  );
}

export default LikedVideos;
