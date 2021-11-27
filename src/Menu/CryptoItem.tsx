import * as React from 'react';
import CryptoInfo from '../CryptoDetails/CryptoInfo';
//going to use material ui componenet here - perhaps paper
export interface Props {
  tokenId: string,
  tokenName: string,
  tokenSym: string,
  clickCurrency?: any
};

const CryptoItem = (props: Props) => {

  return (
    <>
      <li className="eachCryptoc" value={props.tokenId} onClick={(e) => props.clickCurrency(e)}>
        <strong>{props.tokenId} </strong>
        {props.tokenName}
        {props.tokenSym === null ? '' : props.tokenSym}
      </li>
    </>
  );
};

export default CryptoItem;