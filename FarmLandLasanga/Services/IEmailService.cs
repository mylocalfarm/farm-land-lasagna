namespace FarmLandLasanga.Services
{
    public interface IEmailService
    {
        void SendOneTimePassword(string email);

        object ProcessOneTimePassword(string password);
    }
}