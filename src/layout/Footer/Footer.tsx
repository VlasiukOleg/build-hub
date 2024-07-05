interface IFooterProps {}

const Footer: React.FunctionComponent<IFooterProps> = props => {
  return (
    <footer className="border-t-[1px] border-accent">
      <div className="container text-center py-5 text-sm">
        ©BudStock 2024 all rights reserved
      </div>
    </footer>
  );
};

export default Footer;
