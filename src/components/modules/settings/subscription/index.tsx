"use client";
import { useEffect, useState } from "react";

import dayjs from "dayjs";
require("dayjs/locale/es");
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

import { Loading } from "@/components/modals/components/Loading";
import { SimpleButton } from "@/components/ui/buttons/simpleButton";
import Text from "@/components/ui/text";
import { useSubscription } from "@/hooks/useSubscription";
import { auth, initFirebase } from "@/services/firebase";
import { getCheckoutUrl, getPremiumStatus } from "@/services/stripePayments";
import { CancelPeriod, STATUS_LABELS } from "@/types/stripePayments";
import { getDatefromTimestamp } from "@/utils/common";

import { SubcriptionModal } from "./modals";

export const Subscription = () => {
  dayjs.locale("es");
  const app = initFirebase();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [isPremium, setIsPremium] = useState(false);
  const [subscription, setSubscription] = useState<CancelPeriod>({
    cancelAtPeriodEnd: false,
  });
  const { IsValidSubscription } = useSubscription();

  const router = useRouter();

  const upgradeToPremium = async () => {
    const checkoutUrl = await getCheckoutUrl(app);
    router.push(checkoutUrl);
    console.log("Upgrade to Premium");
  };

  const checkPremium = async () => {
    setIsLoading(true);
    const newPremiumStatus = await getPremiumStatus(app);

    setIsLoading(false);
    setSubscription(newPremiumStatus);

    setIsPremium(IsValidSubscription(newPremiumStatus));
  };

  const statusPanel = isPremium ? (
    <PremiumPanel setShowModal={setShowModal} />
  ) : (
    <StandardPanel manageSubscription={upgradeToPremium} />
  );

  useEffect(() => {
    /**
     * Configura un observador de estado de autenticación y obtén datos del usuario
     * https://firebase.google.com/docs/auth/web/start?hl=es-419#set_an_authentication_state_observer_and_get_user_data
     *  */
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email } = user;
        setUserEmail(email || "");
        checkPremium();
      }
    });
  }, [app, auth.currentUser]);

  return (
    <div className="grid gap-16 px-8">
      <SubcriptionModal
        show={showModal}
        setShow={setShowModal}
        userEmail={userEmail}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      <Text size="3xl" color="dark">
        Subscripción
      </Text>
      <div className="grid gap-4">
        <div className="flex justify-between border-b-2 pb-4">
          <Text color="dark" className="self-center">
            Usuario
          </Text>
        </div>
        <div className="grid pt-8 gap-4">
          <div className="grid gap-4 w-full border border-gray-300 rounded-lg p-6 pb-16">
            <Text size="2xl" weight="bold" className="!text-main-blue">
              Biznes.
            </Text>
            <div className="flex w-full gap-8">
              <Text size="xl" weight="bold" className="w-1/3">
                Tipo de Subscripción
              </Text>
              <Text size="xl" color="dark" weight="semibold" className="w-2/3">
                {isLoading && <Loading />}
                {!isLoading &&
                  STATUS_LABELS[`${subscription.status || "noActive"}`]}
              </Text>
            </div>
            <div className="flex w-full gap-8">
              <Text size="xl" weight="bold" className="w-1/3">
                Pago
              </Text>
              <Text size="xl" color="dark" weight="semibold" className="w-2/3">
                100 mx mensuales (impuestos incluidos)
              </Text>
            </div>
            <div className="flex w-full gap-8">
              <Text size="xl" weight="bold" className="w-1/3">
                Válido hasta
              </Text>
              <Text size="xl" color="dark" weight="semibold" className="w-2/3">
                {isLoading && <Loading />}
                {subscription.currentPeriodEnd &&
                  `${dayjs(
                    getDatefromTimestamp(
                      subscription.currentPeriodEnd
                    ).toString()
                  ).format("DD [de] MMMM YYYY")}`}
              </Text>
            </div>
          </div>
          {statusPanel}
        </div>
      </div>
    </div>
  );
};

const PremiumPanel = ({
  setShowModal,
}: {
  setShowModal: (showModal: boolean) => void;
}) => {
  return (
    <div className="grid gap-4">
      <Text color="dark" size="lg" weight="semibold">
        Cancelar tu Subscripción
      </Text>
      <Text>
        Una vez que canceles tu subscripción expirará al final de tu periodo de
        subscripción y tu tarjeta ya no será cargada. Recuerda que puedes
        reiniciar tu subscripción en cualquier momento.
      </Text>
      <div className="">
        <SimpleButton onClick={() => setShowModal(true)}>
          Cancelar tu subscripción
        </SimpleButton>
      </div>
    </div>
  );
};

const StandardPanel = ({
  manageSubscription,
}: {
  manageSubscription: () => Promise<void>;
}) => {
  return (
    <div className="grid gap-4">
      <Text color="dark" size="lg" weight="semibold">
        Subscribirse
      </Text>
      <Text>Texto para subscribirse</Text>
      <div className="">
        <SimpleButton
          onClick={async () => {
            await manageSubscription();
          }}
        >
          Iniciar subscripción
        </SimpleButton>
      </div>
    </div>
  );
};
