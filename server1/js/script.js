const API_URL = "lab5server2-hjacdrdtasgeaeeq.canadacentral-01.azurewebsites.net";

class PatientApp {

    constructor() {

        this.insertButton =
            document.getElementById("insertButton");

        this.queryButton =
            document.getElementById("queryButton");

        this.sqlQuery =
            document.getElementById("sqlQuery");

        this.response =
            document.getElementById("response");

        this.insertButton.addEventListener("click", () => {
            this.insertPatients();
        });

        this.queryButton.addEventListener("click", () => {
            this.getPatients();
        });
    }

    insertPatients() {
        this.sendRequest("POST", API_URL);
    }

    getPatients() {

        const query = this.sqlQuery.value;

        if (query.trim() === "") {
            this.response.textContent = MESSAGES.EMPTY_QUERY;
            return;
        }

        this.sendRequest(
            "GET",
            API_URL + encodeURIComponent(query)
        );
    }

    sendRequest(method, requestUrl) {

        const xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = () => {

            if (xhttp.readyState === 4) {

                if (xhttp.status === 200) {

                    this.response.textContent =
                        xhttp.responseText;

                } else if (xhttp.status === 0) {

                    this.response.textContent =
                        MESSAGES.NETWORK_ERROR;

                } else {

                    this.response.textContent =
                        MESSAGES.REQUEST_FAILED +
                        xhttp.status + "\n" +
                        xhttp.responseText;
                }
            }
        };

        xhttp.open(method, requestUrl, true);
        xhttp.send();
    }
}

const app = new PatientApp();
