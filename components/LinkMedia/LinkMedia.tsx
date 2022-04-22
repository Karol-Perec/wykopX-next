import { useRef } from 'react';
import ReactPlayer from 'react-player';
import Link from 'next/link';
import useIsOnScreen from 'hooks/useIsOnScreen';
import { MediaType } from 'types/media.types';
import * as S from './LinkMedia.styles';
import useIsWindow from '../../hooks/useIsWindow';

type ImageQuality = 'original' | 'hq' | 'mq' | 'lq';

interface LinkMediaProps {
  type?: MediaType;
  sourceUrl: string;
  imageUrl?: string;
  linkTo: string;
  plus18: boolean;
  aspectRatio?: number;
  previewQuality: ImageQuality;
}

export const getDisplayedImageUrl = (imageUrl: string, quality: ImageQuality) => {
  const qualityResoultionMap: Record<ImageQuality, string> = {
    hq: ',w400',
    mq: ',w300h223',
    lq: ',w207h139',
    original: '',
  };

  return imageUrl?.replace(/,w[0-9]+(h[0-9]+)?/g, qualityResoultionMap[quality]);
};

const LinkMedia = ({
  type,
  sourceUrl,
  imageUrl,
  linkTo,
  plus18,
  aspectRatio,
  previewQuality,
}: LinkMediaProps) => {
  const isWindow = useIsWindow();
  const mediaContainerRef = useRef<HTMLDivElement>(null);
  const isOnScreen = useIsOnScreen(mediaContainerRef);
  const displayedImageUrl = imageUrl && getDisplayedImageUrl(imageUrl, 'hq');
  const isVideo = type === 'video' || ReactPlayer.canPlay(sourceUrl);

  const enlargeVideo = (event: MouseEvent) => {
    event.stopPropagation();
    if (!mediaContainerRef?.current) return;
    mediaContainerRef.current.style.width = '100%';
    mediaContainerRef.current.style.transition = 'width 0.3s ease-in-out';
  };

  const media = isVideo ? isWindow && (
    <ReactPlayer
      url={sourceUrl}
      controls
      light={displayedImageUrl}
      width='100%'
      height='100%'
      onClickPreview={enlargeVideo}
      playing={isOnScreen}
    />
  ) : (
    <Link href={linkTo}>
      <a onClick={(e) => e.stopPropagation()}>
        {displayedImageUrl ? <S.Image src={displayedImageUrl} /> : <S.DefaultImage />}
      </a>
    </Link>
  );

  return (
    <S.Container ref={mediaContainerRef} aspectRatio={aspectRatio}>
      {media}
    </S.Container>
  );
};

export default LinkMedia;
