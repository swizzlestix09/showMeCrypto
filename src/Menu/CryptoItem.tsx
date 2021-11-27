
//going to use material ui componenet here - perhaps paper
export interface Props {
  tokenId: string,
  tokenName: string,
  tokenSym: string
};

const CryptoItem= (props: Props) => (
  <>
    <li className="eachCryptoc">
      <abbr>{props.tokenId} </abbr>
      <strong> {props.tokenName} </strong>
      {props.tokenSym === null ? '' : props.tokenSym}
    </li>
  </>
);

export default CryptoItem;