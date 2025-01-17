import dynamic from "next/dynamic";

const Menu = dynamic(() => import('yes-bank-components').then((mod) => mod.Menu), { ssr: false });
const InsertTransactionButton = dynamic(() => import('yes-bank-components').then((mod) => mod.InsertTransactionButton), { ssr: false });
const EditTransactionScreen = dynamic(() => import('yes-bank-components').then((mod) => mod.EditTransactionScreen), { ssr: false });
const DeleteTransactionButton = dynamic(() => import('yes-bank-components').then((mod) => mod.DeleteTransactionButton), { ssr: false });
const FilterIconButton = dynamic(() => import('yes-bank-components').then((mod) => mod.FilterIconButton), { ssr: false });
const LoginButton = dynamic(() => import('yes-bank-components').then((mod) => mod.LoginButton), { ssr: false });
const Modal = dynamic(() => import('yes-bank-components').then((mod) => mod.Modal), { ssr: false });
const LookupField = dynamic(() => import('yes-bank-components').then((mod) => mod.LookupField), { ssr: false });
const TextField = dynamic(() => import('yes-bank-components').then((mod) => mod.TextField), { ssr: false });
const NumberField = dynamic(() => import('yes-bank-components').then((mod) => mod.NumberField), { ssr: false });
const DateField = dynamic(() => import('yes-bank-components').then((mod) => mod.DateField), { ssr: false });
const PasswordField = dynamic(() => import('yes-bank-components').then((mod) => mod.PasswordField), { ssr: false });
const AttachmentField = dynamic(() => import('yes-bank-components').then((mod) => mod.AttachmentField), { ssr: false });
const EmailField = dynamic(() => import('yes-bank-components').then((mod) => mod.EmailField), { ssr: false });
const Header = dynamic(() => import('yes-bank-components').then((mod) => mod.Header), { ssr: false });
const Dashboard = dynamic(() => import('yes-bank-components').then((mod) => mod.Dashboard), { ssr: false });
const ContainerComponent = dynamic(() => import('yes-bank-components').then((mod) => mod.ContainerComponent), { ssr: false });

export {
    Menu,
    InsertTransactionButton,
    EditTransactionScreen,
    DeleteTransactionButton,
    FilterIconButton,
    LoginButton,
    Modal,
    LookupField,
    TextField,
    NumberField,
    DateField,
    PasswordField,
    AttachmentField,
    EmailField,
    Header,
    Dashboard,
    ContainerComponent,
}