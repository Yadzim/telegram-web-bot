const tg = window.Telegram.WebApp;

export default function useTelegram() {
  const onClose = () => {
    tg.close();
  };

  const onToggleMainButton = (visible, text, onClick = () => {}) => {
    if (!visible) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        color: "#fbbf24",
        textColor: "#000",
        text: text ?? "Savatga o'tish",
      });
      tg.MainButton.onClick(onClick);
    }
  };

  const onToggleBackButton = (visible, onClick = () => {}) => {
    if (!visible) {
      tg.BackButton.hide();
    } else {
      tg.BackButton.show();
      tg.BackButton.onClick(onClick);
    }
  };

  return {
    onClose,
    onToggleMainButton,
    onToggleBackButton,
    tg,
    user: tg.initDataUnsafe?.user,
    queryId: tg.initDataUnsafe?.query_id,
  };
}
