import { AutoSizer, List } from "react-virtualized";
import Token from "./Token";
import { useStateContext, useViewContext } from "@/hooks";
import { isFrom } from "@/utils";

type TokensListProps = {
    searchTerm: string;
    tokens: Token[];
};

const TokensList = ({ searchTerm, tokens }: TokensListProps) => {
    const {
        state: { fromToken, toToken },
        dispatch,
    } = useStateContext();
    const { state: viewState, dispatch: viewDispatch } = useViewContext();

    const handleFilterTokens = (item: Token) => {
        return (
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.address === searchTerm
        );
    };

    const handleSetToken = (token: Token) => {
        if (isFrom(viewState.onSelecting)) {
            if (toToken?.address === token.address) {
                dispatch({
                    type: "SET_TO_TOKEN",
                    payload: null,
                });
            }
            dispatch({
                type: "SET_FROM_TOKEN",
                payload: token,
            });
        } else {
            if (fromToken?.address === token.address) {
                dispatch({
                    type: "SET_FROM_TOKEN",
                    payload: null,
                });
            }
            dispatch({
                type: "SET_TO_TOKEN",
                payload: token,
            });
        }

        viewDispatch({
            type: "SET_CURRENT_VIEW",
            payload: "exchange",
        });
    };

    return (
        <AutoSizer>
            {({ width, height }) => (
                <List
                    width={width}
                    height={height}
                    rowHeight={60}
                    rowRenderer={(props) => (
                        <Token
                            onclick={(token: Token) => handleSetToken(token)}
                            data={
                                [...tokens].filter(handleFilterTokens)[
                                    props.index
                                ]
                            }
                            key={props.key}
                            style={props.style}
                        />
                    )}
                    rowCount={[...tokens].filter(handleFilterTokens).length}
                    overscanRowCount={3}
                />
            )}
        </AutoSizer>
    );
};

export default TokensList;
