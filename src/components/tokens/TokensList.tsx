import { AutoSizer, List } from "react-virtualized";
import Token from "./Token";
import { useStateContext, useViewContext } from "@/hooks";
import { isFrom } from "@/utils";

type TokensListProps = {
    searchTerm: string;
    tokens: Token[];
};

const TokensList = ({ searchTerm, tokens }: TokensListProps) => {
    const { dispatch } = useStateContext();
    const { state: viewState, dispatch: viewDispatch } = useViewContext();

    const handleFilterTokens = (item: any) => {
        return (
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.address === searchTerm
        );
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
                            onclick={(token: Token) => {
                                if (isFrom(viewState.onSelecting)) {
                                    dispatch({
                                        type: "SET_FROM_TOKEN",
                                        payload: token,
                                    });
                                } else {
                                    dispatch({
                                        type: "SET_TO_TOKEN",
                                        payload: token,
                                    });
                                }

                                viewDispatch({
                                    type: "SET_CURRENT_VIEW",
                                    payload: "exchange",
                                });
                            }}
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
