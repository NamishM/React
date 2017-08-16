# HTTPS

HTTPS is necessary to secure communications between clients and the server)

1. [Download windows PowerShell v5](https://www.microsoft.com/en-us/download/details.aspx?id=50395)
1. [LetsEncrypt Setup](https://www.youtube.com/watch?v=tohX24vUnW8&feature=youtu.be)
1. [LetsEncrypt Renewal](https://www.youtube.com/watch?v=hXKOBKjWhV8&feature=youtu.be)
1. [Automating Renewals and Challenges](https://www.youtube.com/watch?v=a2jYiGahea4&feature=youtu.be)

## Reference

- [Automatic Certificate Management Environment (ACME)](https://letsencrypt.github.io/acme-spec/#rfc.section.7)

## Troubleshooting

- `Exception calling "Invoke" with "1" argument(s): "A specified logon session does not exist. It may already have been terminated"`
  - [Possible Solution](https://github.com/ebekker/ACMESharp/issues/135)