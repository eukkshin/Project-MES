import styled from "styled-components";

interface EqualizerLoaderProps {
    message?: string;
}

export default function EqualizerLoader({
    message = '데이터를 불러오고 있어요'
}: EqualizerLoaderProps){

    return(
        <LoadingWrapper role="status" aria-live="polite">
            <Equalizer>
                {[0,1,2,3,4].map(item=>(
                    <EqualizerBar
                    key={item}
                    $delay={`${item*0.12}s`}
                    />
                ))}
            </Equalizer>

            <LoadingText>{message}</LoadingText>
        </LoadingWrapper>
    );
}

export const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  min-height: 180px;
`;

export const Equalizer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  height: 38px;
`;

export const EqualizerBar = styled.span<{ $delay: string }>`
  width: 5px;
  height: 10px;
  border-radius: 10px;
  background: #4F83CC;

  animation: equalize 0.8s ease-in-out infinite alternate;
  animation-delay: ${({ $delay }) => $delay};

  @keyframes equalize {
    0% {
      height: 7px;
      opacity: 0.45;
    }

    100% {
      height: 34px;
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    height: 18px;
    opacity: 1;
  }
`;

export const LoadingText = styled.span`
  color: #7186A3;
  font-size: 13px;
  font-weight: 500;
`;