import { Store } from "@components/header/store";
import { storesMock } from "@mocks";
import { HeaderProps } from "./header.interface"
import { ContainerHeader } from "./header.styles"

export const Header = ({ ...props }: HeaderProps) => {
    const stores = storesMock;
    return <ContainerHeader {...props}>
        {stores.map(store => <Store {...store} />)}
    </ContainerHeader>
}