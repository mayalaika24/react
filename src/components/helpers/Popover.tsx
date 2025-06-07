import { Popover } from "radix-ui";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { VoidFunc } from "../../types";
import gc from "../../utils/gc";

const PopoverComponent = ({ onNavigateToProfile, onUpdatePassword, onLogout }: { onNavigateToProfile: VoidFunc, onUpdatePassword: VoidFunc, onLogout: VoidFunc }) => {
    const { t } = useTranslation();
    const buttons = [
        { icon: '/icons/profile.svg', command: () => onNavigateToProfile(), title: 'profile' },
        { icon: '/icons/password.svg', command: () => onUpdatePassword(), title: 'update_password' },
        { icon: '/icons/logout.svg', command: () => onLogout(), title: 'logout', theme: 'red' }
    ]
    const userData = useSelector((state: RootState) => state.userData.value) || null;
	return  (
    <Popover.Root>
		<Popover.Trigger className="z-1" asChild>
			<button className="IconButton" aria-label="Update dimensions">
                <img className="w-10 h-10 rounded-full object-cover" src={ userData?.image ? `${ gc.baseURL }/${ userData?.image}` : 'https://avatar.iran.liara.run/public/boy' } />
			</button>
		</Popover.Trigger>
		<Popover.Portal>
			<Popover.Content className="PopoverContent" sideOffset={5}>
                <div className="bg-white rounded-lg shadow-popover p-4 flex flex-col gap-4"> 
                    {
                        buttons.map((element, i) => {
                            return (
                                <button onClick={ () => element.command() } className="flex items-center gap-2" key={ i }>
                                    <img src={ element.icon } />
                                    <span className={`${ element.theme ? 'text-red' : '' }`}>{ t(element.title) }</span>
                                </button>
                            )
                        })
                    }
                </div>
				<Popover.Arrow className="PopoverArrow bg-white" />
			</Popover.Content>
		</Popover.Portal>
	</Popover.Root>
    )
};

export default PopoverComponent;
