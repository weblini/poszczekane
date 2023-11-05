import InfoText from "./InfoText";

export default function FailedUpdateText() {
    return (
        <InfoText category="error" className="pt-2 lg:pt-3">
            Przepraszamy, nie udało się zaktualizować Twoich danych. Spróbuj
            ponownie później lub skontaktuj się z pomocą techniczną.
        </InfoText>
    );
}
