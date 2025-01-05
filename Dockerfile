FROM mongo:8.0.4
RUN openssl rand -base64 756 > /etc/mongo-keyfile 
RUN chmod 400 /etc/mongo-keyfile 
RUN chown mongodb:mongodb /etc/mongo-keyfile 

# f8591bfe-093c-4efd-9ddf-58c0d9f0d599
# https://api.flock.com/hooks/sendMessage/39d3f306-3a6d-4cef-9616-148245903b93