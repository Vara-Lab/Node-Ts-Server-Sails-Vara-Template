import { GearKeyring, HexString } from '@gear-js/api';
import { IKeyringPair } from "@polkadot/types/types";
import SailsCalls from './SailsCalls';

/**
 * Returns Keyring to sign messages
 * Helper functions that returns a Keyring from an account name and account mnemonic
 * @param accountName acount name to get keyring
 * @param accountMnemonic account mnemonic to get keyring
 * @returns KeyringPair to sign messages (commands)
 */
export const signerFromAccount = (accountName: string, accountMnemonic: string): Promise<IKeyringPair> => {
    return new Promise(async (resolve, reject) => {
      try {
        const signer = await GearKeyring.fromMnemonic(
          accountMnemonic, 
          accountName
        );
  
        resolve(signer);
      } catch (e) {
        reject(e);
      }
    });
}
  
/**
 * Returns a SailsCalls instance
 * Helper functions that returns an instance of SailsCalls.
 * @param network network to connect (testnet o mainnet)
 * @param contractId contract id to send messages or queries 
 * @param idl idl to set methods of a contract
 * @param accountName accouunt name in case to use vouchers
 * @param accountMnemonic account mnemonic in case to use vouchers (optional)
 * @returns SailsCalls instance
 */
export const sailsInstance = (
    network: string, 
    contractId: HexString, 
    idl: string,
    accountName?: string,
    accountMnemonic?: string
): Promise<SailsCalls> => {
    return new Promise(async (resolve, reject) => {
        let sailsCalls: SailsCalls | null= null;
        try {
            sailsCalls = await SailsCalls.new({
                network,
                contractId,
                idl
            });
        } catch (e) {
            reject(e);
            return;
        }

        try {
            if (accountName && accountMnemonic) {
                await sailsCalls.withAccountToSignVouchers(
                    accountMnemonic,
                    accountName
                );
            }
        } catch (e) {
            console.error('signer account for vouchers not set');
        }

        resolve(sailsCalls);
    });
}