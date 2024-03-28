import styled from 'styled-components';
import RangeInput from '@/components/commons/RangeInput';
import ProgressBar from '@/components/commons/ProgressBar';
import MdmVoteButton from '@/components/MdmVoteButton';
import { IMdm } from '@/apis/types/mdm-post ';
import { useVote } from '@/hooks/useVote';
import { useState } from 'react';

interface StyleProps {
    border?: boolean;
}

interface Props extends StyleProps {
    data: IMdm;
    handleDataChange: (id: number, newData: IMdm) => void;
}

const MdmCard = ({ data, handleDataChange, ...styleProps }: Props) => {
    const { progressValue, handleProgress } = useVote(data, handleDataChange);
    const [inputValue, setInputValue] = useState<number>(50);

    return (
        <StyledMdmCard {...styleProps}>
            <MdmVoteForm>
                <div className="mdm-vote_btns">
                    <MdmVoteButton
                        content={data.opinion1.opinion}
                        isSelected={
                            data.opinion1.myRatio && data.opinion1.myRatio >= 5 ? true : false
                        }
                    />
                    <MdmVoteButton
                        content={data.opinion2.opinion}
                        isSelected={
                            data.opinion2.myRatio && data.opinion2.myRatio >= 5 ? true : false
                        }
                    />
                </div>
                <RangeInput
                    min={0}
                    max={100}
                    step={10}
                    value={inputValue}
                    handleProgress={(e) => {
                        handleProgress(e);
                        setInputValue(parseInt(e.currentTarget.value));
                    }}
                />
            </MdmVoteForm>
            <MdmResult>
                {progressValue ? (
                    <ProgressBar
                        max={100}
                        value={progressValue}
                        reverse={data.opinion2.count > data.opinion1.count ? true : false}
                    />
                ) : (
                    <NotVote>투표하고 결과보기</NotVote>
                )}

                <VoteCount>{data.vote}명 투표</VoteCount>
            </MdmResult>
        </StyledMdmCard>
    );
};

const StyledMdmCard = styled.div<StyleProps>`
    padding: 18px;
    display: flex;
    flex-direction: column;
    background-color: white;
    border: ${({ theme, border }) => (border ? `1px solid ${theme.BORDER_LIGHT}` : 'none')};
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const MdmVoteForm = styled.div`
    width: 100%;
    padding-bottom: 18px;

    .mdm-vote_btns {
        margin-bottom: 8px;
        display: flex;
        gap: 16px;
    }
`;

const MdmResult = styled.div`
    margin-top: 18px;
`;

const VoteCount = styled.div`
    font-size: 12px;
    color: ${({ theme }) => theme.LIGHT_BLACK};
    text-align: right;
    padding-right: 2px;
`;

const NotVote = styled.div`
    width: 100%;
    height: 24px;
    padding-top: 2px;
    margin-bottom: 8px;
    border-radius: 3px;
    font-size: 12px;
    text-align: center;
    border: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
    background-color: ${({ theme }) => theme.BORDER_LIGHT};
    color: ${({ theme }) => theme.DARK_BLACK};
`;

export default MdmCard;
