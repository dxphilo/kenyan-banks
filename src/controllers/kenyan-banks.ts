import { NextFunction, Request, Response, Router } from 'express';
import kenyanBanks from '../public/banks.json';
import { bank } from '../interface';

const router = Router();

async function banks(req: Request, res: Response, next: NextFunction) {
    try {
        const domainUrl = `http://${req.headers.host}`;
        const newBanks: bank[] = kenyanBanks.map((bank) => {
            const slugname = bank.name.split(' ').join('-').toLowerCase();
            return {
                name: bank.name,
                code: bank.bank_code,
                slug: slugname,
                ussd: '',
                logo: domainUrl + '/logo/' + slugname + '.png'
            };
        });
        return res.status(200).json({ banks: newBanks });
    } catch (error) {
        next(error);
        return;
    }
}

async function getBank(req: Request, res: Response, next: NextFunction) {
    try {
        const { bank_code } = req.query;

        if (!bank_code) {
            return res.status(400).json({ message: 'bank_code is required' });
        }

        const domainUrl = `http://${req.headers.host}`;
        const newBank = kenyanBanks.find(
            (bank) => bank.bank_code === bank_code
        );

        if (!newBank) {
            return res.status(404).json({
                message: 'Bank with the provided bank_code code not found'
            });
        }

        const slugname = newBank.name.split(' ').join('-').toLowerCase();

        const bankData: bank = {
            name: newBank.name,
            code: newBank.bank_code,
            slug: slugname,
            ussd: '',
            logo: domainUrl + '/logo/' + slugname + '.png'
        };

        return res.status(200).json({ bank: bankData });
    } catch (error) {
        next(error);
        return;
    }
}

// Routes
router.get('/', banks);
router.get('/bank', getBank);

export default router;
