import MenuItem from '@mui/material/MenuItem';
export interface Props {
  tokenId: string,
  tokenName: string,
  tokenSym: string,
  clickCurrency?: any
};

const CryptoItem = (props: Props) => {
  return (
    <>
      <MenuItem>
        <button className="eachCryptoc" value={props.tokenId} onClick={(e) => props.clickCurrency(e.target)}>
          {`${props.tokenId} `}
        </button>
      </MenuItem>
    </>
  );
};

export default CryptoItem;