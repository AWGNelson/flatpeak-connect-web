import {useConnect} from "../../features/connect/lib/ConnectProvider.tsx";
import {FormEventHandler} from "react";
import ButtonBig from "../../shared/ui/ButtonBig/ButtonBig.tsx";
import Layout from "../../shared/ui/Layout/Layout.tsx";
import MainHeading from "../../shared/ui/MainHeading/MainHeading.tsx";
import Typography from "../../shared/ui/Typography/Typography.tsx";
import Box from "../../shared/ui/Box/Box.tsx";
import BlockHeading from "../../shared/ui/BlockHeading/BlockHeading.tsx";
import HandIcon from "../../shared/ui/icons/HandIcon.tsx";
import InputRate from "../../shared/ui/InputRate/InputRate.tsx";
import FooterActions from "../../shared/ui/FooterActions/FooterActions.tsx";
import {LeadingText} from "../../shared/ui/LeadingText/LeadingText.tsx";
import {submitAction} from "../../features/connect/lib/service.ts";
import {getCurrencySymbol} from "../../shared/lib/util.ts";

export const RateFixedCapture = () => {
    const {action, proceed} = useConnect<"rate_fixed_capture">();

    const handleSubmit: FormEventHandler = (event) => {
        event.preventDefault();
        const {
            cost: {value: cost},
        } = event.target as unknown as {[PostalAddressKey: string]: {value: string}};

        proceed(submitAction({
            route: action.route,
            type: "submit",
            connect_token: action.connect_token,
            data: {
                cost: Number(cost)
            }
        }));
    }

    return (
        <Layout component={"form"} footer={<FooterActions><ButtonBig label={"Next"} type="submit"/></FooterActions>} onSubmit={handleSubmit} noValidate>
            <MainHeading text="Fixed rate tariff plan" />
            <LeadingText>
                <Typography color="black_a40" variant="leading_string">
                    Your tariff does not depend on any factors. It means you have a
                    flat price all the time. Please provide the price.
                </Typography>
            </LeadingText>
            <BlockHeading text="All year, all week, all day" icon={<HandIcon width={24} height={32}/>}/>
            <Box mt={16}>
                <InputRate
                    name="cost"
                    currency={getCurrencySymbol(action.data.currency_code)}
                    defaultValue={action.data.cost}
                    autoFocus={true}
                />
            </Box>
        </Layout>
    )
}
