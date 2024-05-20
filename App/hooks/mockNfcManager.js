const mockNfcManager = {
    start: async () => console.warn('NFC Manager is not available'),
    requestTechnology: async () => console.warn('NFC Manager is not available'),
    ndefHandler: {
      writeNdefMessage: async () => console.warn('NFC Manager is not available'),
    },
    cancelTechnologyRequest: async () => console.warn('NFC Manager is not available'),
    setEventListener: () => console.warn('NFC Manager is not available'),
  };
  
  export const NfcTech = {
    Ndef: 'Ndef',
  };
  
  export const Ndef = {
    textRecord: (text) => ({ text }),
  };
  
  export default mockNfcManager;
  