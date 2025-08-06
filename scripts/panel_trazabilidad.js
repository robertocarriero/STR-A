 // --- INICIO DEL CÓDIGO JAVASCRIPT PARA INTERACCIÓN WEB3 ---

        let web3; // Se inicializará dentro de connectWallet
        let aeroPartTraceabilityContract;
        let userAccount;
        
        // ¡IMPORTANTE: Reemplaza con la dirección real de tu contrato desplegado!
        let contractAddress = '0x745fd204762c0166EEA140c4EABf746a1B042463';
        
        // ABI de tu contrato (Application Binary Interface)
        // ¡IMPORTANTE: Reemplaza con tu ABI COMPLETO!
        const contractABI = 
        [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "AccessControlBadConfirmation",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "bytes32",
          "name": "neededRole",
          "type": "bytes32"
        }
      ],
      "name": "AccessControlUnauthorizedAccount",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "target",
          "type": "address"
        }
      ],
      "name": "AddressEmptyCode",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "implementation",
          "type": "address"
        }
      ],
      "name": "ERC1967InvalidImplementation",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ERC1967NonPayable",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "FailedCall",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "InvalidInitialization",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "NotInitializing",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "UUPSUnauthorizedCallContext",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "slot",
          "type": "bytes32"
        }
      ],
      "name": "UUPSUnsupportedProxiableUUID",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint64",
          "name": "version",
          "type": "uint64"
        }
      ],
      "name": "Initialized",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "string",
          "name": "serialNumber",
          "type": "string"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "string",
          "name": "serialNumber",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "partNumber",
          "type": "string"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "manufacturer",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "PartRegistered",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "string",
          "name": "serialNumber",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "newStatus",
          "type": "string"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "updatedBy",
          "type": "address"
        }
      ],
      "name": "PartStateUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "previousAdminRole",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "newAdminRole",
          "type": "bytes32"
        }
      ],
      "name": "RoleAdminChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "RoleGranted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "RoleRevoked",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "implementation",
          "type": "address"
        }
      ],
      "name": "Upgraded",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "ADMIN_ROLE",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "DEFAULT_ADMIN_ROLE",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "MANUFACTURER_ROLE",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "MRO_ROLE",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "OPERATOR_ROLE",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "UPGRADE_INTERFACE_VERSION",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_serialNumber",
          "type": "string"
        }
      ],
      "name": "getHistoryEventCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_serialNumber",
          "type": "string"
        }
      ],
      "name": "getPartDetails",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "partNumber",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "manufacturerName",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "isRegistered",
              "type": "bool"
            }
          ],
          "internalType": "struct AeroPartTraceability.Part",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_serialNumber",
          "type": "string"
        }
      ],
      "name": "getPartHistory",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "status",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "location",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "eventPerformedBy",
              "type": "address"
            },
            {
              "internalType": "bytes32[]",
              "name": "associatedDocHashes",
              "type": "bytes32[]"
            },
            {
              "internalType": "string",
              "name": "additionalData",
              "type": "string"
            }
          ],
          "internalType": "struct AeroPartTraceability.HistoryEvent[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        }
      ],
      "name": "getRoleAdmin",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "grantRole",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "hasRole",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "initialize",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "proxiableUUID",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_serialNumber",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_partNumber",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_manufacturerName",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "_initialOwner",
          "type": "address"
        },
        {
          "internalType": "bytes32",
          "name": "_initialDocHash",
          "type": "bytes32"
        }
      ],
      "name": "registerPart",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "callerConfirmation",
          "type": "address"
        }
      ],
      "name": "renounceRole",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "revokeRole",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_serialNumber",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "_newOwner",
          "type": "address"
        }
      ],
      "name": "transferPartOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_serialNumber",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_newStatus",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_location",
          "type": "string"
        },
        {
          "internalType": "bytes32[]",
          "name": "_docHashes",
          "type": "bytes32[]"
        },
        {
          "internalType": "string",
          "name": "_additionalData",
          "type": "string"
        }
      ],
      "name": "updatePartState",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newImplementation",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "upgradeToAndCall",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    }
  ]
     
        // Los ROLES se inicializarán una vez que Web3 esté disponible
        let ROLES; 

        // --- Funciones de Utilidad ---

        async function connectWallet() {
            if (window.ethereum) {
                try {
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    
                    web3 = new Web3(window.ethereum);

                    // Inicializar ROLES AHORA que Web3 está disponible
                    ROLES = {
                        ADMIN_ROLE: web3.utils.keccak256("ADMIN_ROLE"),
                        MANUFACTURER_ROLE: web3.utils.keccak256("MANUFACTURER_ROLE"),
                        MRO_ROLE: web3.utils.keccak256("MRO_ROLE"),
                        OPERATOR_ROLE: web3.utils.keccak256("OPERATOR_ROLE")
                    };
                    
                    const accounts = await web3.eth.getAccounts();
                    userAccount = accounts[0];
                    document.getElementById('connectedAccount').textContent = userAccount;
                    document.getElementById('connectionStatus').textContent = 'Conectado';
                    document.getElementById('connectionStatus').classList.remove('status-disconnected');
                    document.getElementById('connectionStatus').classList.add('status-connected');

                    aeroPartTraceabilityContract = new web3.eth.Contract(contractABI, contractAddress);
                    console.log("Contrato instanciado:", aeroPartTraceabilityContract);
                    await checkUserRole();

                } catch (error) {
                    console.error("Error al conectar la billetera:", error);
                    document.getElementById('connectionStatus').textContent = 'Error de Conexión';
                    document.getElementById('connectionStatus').classList.remove('status-connected');
                    document.getElementById('connectionStatus').classList.add('status-disconnected');
                    if (error.code === 4001) {
                        alert('Conexión a MetaMask rechazada por el usuario.');
                    }
                }
            } else {
                alert('MetaMask no está instalado. Por favor, instala MetaMask para usar esta aplicación.');
                document.getElementById('connectionStatus').textContent = 'MetaMask no encontrado';
            }
        }

        async function checkUserRole() {
            if (aeroPartTraceabilityContract && userAccount && ROLES) {
                try {
                    let roleText = "Sin rol específico";
                    if (await aeroPartTraceabilityContract.methods.hasRole(ROLES.ADMIN_ROLE, userAccount).call()) {
                        roleText = "Administrador";
                    } else if (await aeroPartTraceabilityContract.methods.hasRole(ROLES.MANUFACTURER_ROLE, userAccount).call()) {
                        roleText = "Fabricante";
                    } else if (await aeroPartTraceabilityContract.methods.hasRole(ROLES.MRO_ROLE, userAccount).call()) {
                        roleText = "MRO";
                    } else if (await aeroPartTraceabilityContract.methods.hasRole(ROLES.OPERATOR_ROLE, userAccount).call()) {
                        roleText = "Operador";
                    }
                    document.getElementById('userRole').textContent = roleText;
                } catch (error) {
                    console.error("Error al verificar el rol del usuario:", error);
                    document.getElementById('userRole').textContent = 'Error al cargar el rol';
                }
            } else {
                document.getElementById('userRole').textContent = 'Conecta la billetera para ver el rol';
            }
        }

        // --- Funciones para Interacciones con el Contrato ---

        // (Ya existente)
        async function registerPart(event) {
            event.preventDefault();
            if (!aeroPartTraceabilityContract || !userAccount) {
                alert('Por favor, conecta tu billetera primero.');
                return;
            }

            const serialNumber = document.getElementById('regSerialNumber').value;
            const partNumber = document.getElementById('regPartNumber').value;
            const manufacturerName = document.getElementById('regManufacturerName').value;
            const initialOwnerAddress = document.getElementById('regInitialOwnerAddress').value;
            let initialDocHash = document.getElementById('regInitialDocHash').value;

            if (!initialDocHash.startsWith('0x') || initialDocHash.length !== 66) {
                alert('El hash del documento debe ser un valor hexadecimal de 64 caracteres, prefijado con "0x".');
                return;
            }

            const resultDiv = document.getElementById('registerPartResult');
            resultDiv.innerHTML = 'Enviando transacción... Por favor, confirma en MetaMask.';
            resultDiv.className = 'result-message processing';

            try {
                const tx = await aeroPartTraceabilityContract.methods.registerPart(
                    serialNumber,
                    partNumber,
                    manufacturerName,
                    initialOwnerAddress,
                    initialDocHash
                ).send({ from: userAccount });

                resultDiv.innerHTML = `Pieza registrada con éxito! Transacción: <a href="https://sepolia.etherscan.io/tx/${tx.transactionHash}" target="_blank">${tx.transactionHash.substring(0, 10)}...</a>`;
                resultDiv.className = 'result-message success';
                document.getElementById('registerPartForm').reset();

            } catch (error) {
                console.error("Error al registrar la pieza:", error);
                resultDiv.innerHTML = `Error al registrar la pieza: ${error.message}`;
                resultDiv.className = 'result-message error';
            }
        }

        // (Ya existente)
        async function queryPart(event) {
            event.preventDefault();
            if (!aeroPartTraceabilityContract) {
                alert('Por favor, conecta tu billetera primero para consultar datos.');
                return;
            }

            const serialNumber = document.getElementById('querySerialNumber').value;
            const resultDiv = document.getElementById('queryPartResult');
            const detailsDisplay = document.getElementById('partDetailsDisplay');
            const historyDisplay = document.getElementById('partHistoryDisplay');
            const historyTableBody = document.querySelector('#historyTable tbody');
            const noHistoryMessage = document.getElementById('noHistoryMessage');

            resultDiv.innerHTML = 'Consultando datos...';
            resultDiv.className = 'result-message processing';
            detailsDisplay.style.display = 'none';
            historyDisplay.style.display = 'none';
            historyTableBody.innerHTML = '';
            noHistoryMessage.style.display = 'none';

            try {
                const partDetails = await aeroPartTraceabilityContract.methods.getPartDetails(serialNumber).call();
                
                if (!partDetails.isRegistered) {
                    resultDiv.innerHTML = `Error: La pieza con S/N "${serialNumber}" no está registrada.`;
                    resultDiv.className = 'result-message error';
                    return;
                }

                document.getElementById('displayPartNumber').textContent = partDetails.partNumber;
                document.getElementById('displayManufacturerName').textContent = partDetails.manufacturerName;
                document.getElementById('displayOwner').textContent = partDetails.owner;
                document.getElementById('displayIsRegistered').textContent = partDetails.isRegistered ? 'Sí' : 'No';
                detailsDisplay.style.display = 'block';
                
                const partHistory = await aeroPartTraceabilityContract.methods.getPartHistory(serialNumber).call();

                if (partHistory.length > 0) {
                    partHistory.forEach(event => {
                        const row = historyTableBody.insertRow();
                        row.insertCell().textContent = event.status;
                        row.insertCell().textContent = event.location;
                        row.insertCell().textContent = event.timestamp.toString();
                        row.insertCell().textContent = event.eventPerformedBy;
                        
                        const docHashesCell = row.insertCell();
                        if (event.associatedDocHashes && event.associatedDocHashes.length > 0) {
                            event.associatedDocHashes.forEach(hash => {
                                const span = document.createElement('span');
                                span.textContent = hash.substring(0, 10) + '...';
                                span.title = hash;
                                docHashesCell.appendChild(span);
                                docHashesCell.appendChild(document.createElement('br'));
                            });
                        } else {
                            docHashesCell.textContent = 'N/A';
                        }
                        
                        row.insertCell().textContent = event.additionalData || 'N/A';
                    });
                    historyDisplay.style.display = 'block';
                } else {
                    noHistoryMessage.style.display = 'block';
                }
                
                resultDiv.innerHTML = `Datos de la pieza "${serialNumber}" cargados con éxito.`;
                resultDiv.className = 'result-message success';

            } catch (error) {
                console.error("Error al consultar la pieza:", error);
                resultDiv.innerHTML = `Error al consultar la pieza: ${error.message}`;
                resultDiv.className = 'result-message error';
                detailsDisplay.style.display = 'none';
                historyDisplay.style.display = 'none';
            }
        }

        // NUEVA FUNCIÓN: Actualizar Estado de Pieza
        async function updatePartState(event) {
            event.preventDefault();
            if (!aeroPartTraceabilityContract || !userAccount) {
                alert('Por favor, conecta tu billetera primero.');
                return;
            }

            const serialNumber = document.getElementById('updSerialNumber').value;
            const newStatus = document.getElementById('updNewStatus').value;
            const location = document.getElementById('updLocation').value;
            const additionalData = document.getElementById('updAdditionalData').value;
            // Convertir la cadena de hashes separada por comas en un array de bytes32
            const docHashesInput = document.getElementById('updDocHashes').value;
            const docHashes = docHashesInput
                                .split(',')
                                .map(hash => hash.trim())
                                .filter(hash => hash.length > 0)
                                .map(hash => {
                                    // Validar formato del hash
                                    if (!hash.startsWith('0x') || hash.length !== 66) {
                                        throw new Error(`Hash inválido: ${hash}. Debe ser un valor hexadecimal de 64 caracteres, prefijado con "0x".`);
                                    }
                                    return hash;
                                }); // Asegúrate de que los hashes sean bytes32 (64 caracteres hex + 0x)

            const resultDiv = document.getElementById('updateStateResult');
            resultDiv.innerHTML = 'Enviando transacción... Por favor, confirma en MetaMask.';
            resultDiv.className = 'result-message processing';

            try {
                const tx = await aeroPartTraceabilityContract.methods.updatePartState(
                    serialNumber,
                    newStatus,
                    location,
                    docHashes, // Pasar el array de hashes
                    additionalData
                ).send({ from: userAccount });

                resultDiv.innerHTML = `Estado de pieza actualizado con éxito! Transacción: <a href="https://sepolia.etherscan.io/tx/${tx.transactionHash}" target="_blank">${tx.transactionHash.substring(0, 10)}...</a>`;
                resultDiv.className = 'result-message success';
                document.getElementById('updateStateForm').reset();

            } catch (error) {
                console.error("Error al actualizar el estado de la pieza:", error);
                resultDiv.innerHTML = `Error al actualizar estado: ${error.message}`;
                resultDiv.className = 'result-message error';
            }
        }

        // NUEVA FUNCIÓN: Transferir Propiedad
        async function transferPartOwnership(event) {
            event.preventDefault();
            if (!aeroPartTraceabilityContract || !userAccount) {
                alert('Por favor, conecta tu billetera primero.');
                return;
            }

            const serialNumber = document.getElementById('transSerialNumber').value;
            const newOwnerAddress = document.getElementById('transNewOwnerAddress').value;

            const resultDiv = document.getElementById('transferOwnershipResult');
            resultDiv.innerHTML = 'Enviando transacción... Por favor, confirma en MetaMask.';
            resultDiv.className = 'result-message processing';

            try {
                const tx = await aeroPartTraceabilityContract.methods.transferPartOwnership(
                    serialNumber,
                    newOwnerAddress
                ).send({ from: userAccount });

                resultDiv.innerHTML = `Propiedad transferida con éxito! Transacción: <a href="https://sepolia.etherscan.io/tx/${tx.transactionHash}" target="_blank">${tx.transactionHash.substring(0, 10)}...</a>`;
                resultDiv.className = 'result-message success';
                document.getElementById('transferOwnershipForm').reset();

            } catch (error) {
                console.error("Error al transferir propiedad:", error);
                resultDiv.innerHTML = `Error al transferir propiedad: ${error.message}`;
                resultDiv.className = 'result-message error';
            }
        }

        // NUEVAS FUNCIONES: Administración de Roles
        async function grantRole(event) {
            event.preventDefault();
            if (!aeroPartTraceabilityContract || !userAccount || !ROLES) {
                alert('Por favor, conecta tu billetera y asegúrate de que los roles estén cargados.');
                return;
            }

            const accountAddress = document.getElementById('grantAccountAddress').value;
            const roleKey = document.getElementById('grantRoleSelect').value;
            const roleHash = ROLES[roleKey]; // Obtener el hash del rol del objeto ROLES

            if (!roleHash) {
                alert('Por favor, selecciona un rol válido.');
                return;
            }

            const resultDiv = document.getElementById('grantRoleResult');
            resultDiv.innerHTML = 'Enviando transacción... Por favor, confirma en MetaMask.';
            resultDiv.className = 'result-message processing';

            try {
                // El rol DEFAULT_ADMIN_ROLE ya tiene el permiso de grantRole/revokeRole por AccessControl
                // Si quieres que solo tu ADMIN_ROLE personalizado pueda hacerlo, tendrías que modificar AccessControl
                const tx = await aeroPartTraceabilityContract.methods.grantRole(roleHash, accountAddress).send({ from: userAccount });

                resultDiv.innerHTML = `Rol "${roleKey}" concedido a ${accountAddress} con éxito! Transacción: <a href="https://sepolia.etherscan.io/tx/${tx.transactionHash}" target="_blank">${tx.transactionHash.substring(0, 10)}...</a>`;
                resultDiv.className = 'result-message success';
                document.getElementById('grantRoleForm').reset();
                await checkUserRole(); // Volver a chequear el rol del usuario actual por si se asignó a sí mismo

            } catch (error) {
                console.error("Error al conceder rol:", error);
                resultDiv.innerHTML = `Error al conceder rol: ${error.message}`;
                resultDiv.className = 'result-message error';
            }
        }

        async function revokeRole(event) {
            event.preventDefault();
            if (!aeroPartTraceabilityContract || !userAccount || !ROLES) {
                alert('Por favor, conecta tu billetera y asegúrate de que los roles estén cargados.');
                return;
            }

            const accountAddress = document.getElementById('revokeAccountAddress').value;
            const roleKey = document.getElementById('revokeRoleSelect').value;
            const roleHash = ROLES[roleKey]; // Obtener el hash del rol

            if (!roleHash) {
                alert('Por favor, selecciona un rol válido.');
                return;
            }

            const resultDiv = document.getElementById('revokeRoleResult');
            resultDiv.innerHTML = 'Enviando transacción... Por favor, confirma en MetaMask.';
            resultDiv.className = 'result-message processing';

            try {
                const tx = await aeroPartTraceabilityContract.methods.revokeRole(roleHash, accountAddress).send({ from: userAccount });

                resultDiv.innerHTML = `Rol "${roleKey}" revocado de ${accountAddress} con éxito! Transacción: <a href="https://sepolia.etherscan.io/tx/${tx.transactionHash}" target="_blank">${tx.transactionHash.substring(0, 10)}...</a>`;
                resultDiv.className = 'result-message success';
                document.getElementById('revokeRoleForm').reset();
                await checkUserRole(); // Volver a chequear el rol del usuario actual por si se revocó a sí mismo

            } catch (error) {
                console.error("Error al revocar rol:", error);
                resultDiv.innerHTML = `Error al revocar rol: ${error.message}`;
                resultDiv.className = 'result-message error';
            }
        }


        // --- Manejo de Pestañas (ya existente) ---
        function openTab(evt, tabName) {
            let i, tabContent, tabButtons;

            tabContent = document.getElementsByClassName("tab-content");
            for (i = 0; i < tabContent.length; i++) {
                tabContent[i].style.display = "none";
            }

            tabButtons = document.getElementsByClassName("tab-button");
            for (i = 0; i < tabButtons.length; i++) {
                tabButtons[i].className = tabButtons[i].className.replace(" active", "");
            }

            document.getElementById(tabName).style.display = "block";
            evt.currentTarget.className += " active";
        }


        // --- Event Listeners (Actualizados para las nuevas funciones) ---
        document.addEventListener('DOMContentLoaded', () => {
            document.getElementById('connectWalletButton').addEventListener('click', connectWallet);
            document.getElementById('registerPartForm').addEventListener('submit', registerPart);
            document.getElementById('queryPartForm').addEventListener('submit', queryPart);
            // Nuevos Event Listeners para las nuevas secciones
            document.getElementById('updateStateForm').addEventListener('submit', updatePartState);
            document.getElementById('transferOwnershipForm').addEventListener('submit', transferPartOwnership);
            document.getElementById('grantRoleForm').addEventListener('submit', grantRole);
            document.getElementById('revokeRoleForm').addEventListener('submit', revokeRole);


            // Inicializar la primera pestaña activa
            document.getElementsByClassName('tab-button')[0].click();

            // Detectar cambios de cuenta o red en MetaMask
            if (window.ethereum) {
                window.ethereum.on('accountsChanged', (accounts) => {
                    if (accounts.length > 0) {
                        userAccount = accounts[0];
                        document.getElementById('connectedAccount').textContent = userAccount;
                        checkUserRole();
                    } else {
                        userAccount = null;
                        document.getElementById('connectedAccount').textContent = 'N/A';
                        document.getElementById('connectionStatus').textContent = 'Desconectado';
                        document.getElementById('connectionStatus').classList.remove('status-connected');
                        document.getElementById('connectionStatus').classList.add('status-disconnected');
                        document.getElementById('userRole').textContent = 'No conectado';
                    }
                });

                window.ethereum.on('chainChanged', (chainId) => {
                    console.log('Red cambiada a:', chainId);
                    window.location.reload(); 
                });

                if (window.ethereum.isConnected()) {
                    connectWallet();
                }
            }
        });

        // Seleccionamos el botón y el menú por sus IDs
        const hamburgerBtn = document.getElementById('hamburger-btn');
        const navMenu = document.getElementById('nav-menu');

        // Añadimos un "escuchador" para el evento 'click' en el botón
        hamburgerBtn.addEventListener('click', () => {
            // Cada vez que se hace clic, alterna la clase 'menu-open'
            // tanto en el botón (para la animación a 'X') como en el menú (para mostrarlo/ocultarlo)
            hamburgerBtn.classList.toggle('menu-open');
            navMenu.classList.toggle('menu-open');
        });
        // --- FIN DEL CÓDIGO JAVASCRIPT ---
