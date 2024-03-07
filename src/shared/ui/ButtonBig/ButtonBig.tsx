import styles from "./ButtonBig.module.scss";
import View from "../View/View.tsx";
import Typography from "../Typography/Typography.tsx";
import TouchableOpacity from "../../TouchahbleOpacity/TouchableOpacity.tsx";
import {ButtonHTMLAttributes} from "react";

type ButtonBigProps = {
    label?: string;
    variant?: 'default' | 'outlined' | 'critical' | 'secondary' | 'link' | 'critical-invert';
    size?: 'default' | 'small';
} & ButtonHTMLAttributes<HTMLButtonElement>

export default function ButtonBig(props: ButtonBigProps) {
    const {label, variant = 'default', size = 'default', ...buttonAttributes} = props;
    const classList = [styles.host];
    if (variant && styles['variant-' + variant]) {
        classList.push(styles['variant-' + variant])
    }
    if (size && size) {
        classList.push(styles['size-' + size])
    }
    return (
        <TouchableOpacity {...buttonAttributes}>
            <View className={classList.join(' ')}>
                <Typography
                    color={'dynamic'}
                    variant="button__forms20_regular"
                    align="center"
                    className={styles.label}
                >
                    {label}
                </Typography>
            </View>
        </TouchableOpacity>
    );
}
