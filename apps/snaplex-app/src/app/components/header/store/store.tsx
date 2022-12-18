import { StoreProps } from "./store.interface"
import { ContainerStore, StoreDescription, StoreIcon, StoreName } from "./store.styles"

export const Store = ({ icon, name, description, discovered = false, ...props }: StoreProps) => {
    const canDrop = false;
    return <ContainerStore data-candrop={canDrop} {...props}>
        {discovered && <>
            {icon && <StoreIcon>{icon}</StoreIcon>}
            {description && <StoreDescription>{description}</StoreDescription>}
            <StoreName>{name}</StoreName>
        </>}
        {!discovered && <>
            <StoreName>???</StoreName>
            <div />
        </>}
    </ContainerStore>
}