import CryptoItem  from "./CryptoItem";

//might need to add proptype to this..
export interface Props {
  currencies: any[]
};

const CryptoMenu = (props: Props) => {
  console.log('props?', props)
  return (
    <div className="CryptoMenu">
      <p>ohmergosh, CryptoMenu is live</p>
      <CryptoItem />
    </div>
  )
};

export default CryptoMenu;