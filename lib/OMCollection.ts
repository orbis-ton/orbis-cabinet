import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    address, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type DataSize = {
    $$type: 'DataSize';
    cells: bigint;
    bits: bigint;
    refs: bigint;
}

export function storeDataSize(src: DataSize) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.cells, 257);
        b_0.storeInt(src.bits, 257);
        b_0.storeInt(src.refs, 257);
    };
}

export function loadDataSize(slice: Slice) {
    const sc_0 = slice;
    const _cells = sc_0.loadIntBig(257);
    const _bits = sc_0.loadIntBig(257);
    const _refs = sc_0.loadIntBig(257);
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

function loadTupleDataSize(source: TupleReader) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

function loadGetterTupleDataSize(source: TupleReader) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

function storeTupleDataSize(source: DataSize) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.cells);
    builder.writeNumber(source.bits);
    builder.writeNumber(source.refs);
    return builder.build();
}

function dictValueParserDataSize(): DictionaryValue<DataSize> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDataSize(src)).endCell());
        },
        parse: (src) => {
            return loadDataSize(src.loadRef().beginParse());
        }
    }
}

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    const sc_0 = slice;
    const _code = sc_0.loadRef();
    const _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadGetterTupleStateInit(source: TupleReader) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    const builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounceable: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeBit(src.bounceable);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}

export function loadContext(slice: Slice) {
    const sc_0 = slice;
    const _bounceable = sc_0.loadBit();
    const _sender = sc_0.loadAddress();
    const _value = sc_0.loadIntBig(257);
    const _raw = sc_0.loadRef().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

function loadGetterTupleContext(source: TupleReader) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    const builder = new TupleBuilder();
    builder.writeBoolean(source.bounceable);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw.asCell());
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
    value: bigint;
    to: Address;
    bounce: boolean;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeAddress(src.to);
        b_0.storeBit(src.bounce);
    };
}

export function loadSendParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _to = sc_0.loadAddress();
    const _bounce = sc_0.loadBit();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

function loadTupleSendParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

function loadGetterTupleSendParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

function storeTupleSendParameters(source: SendParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    builder.writeNumber(source.value);
    builder.writeAddress(source.to);
    builder.writeBoolean(source.bounce);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type MessageParameters = {
    $$type: 'MessageParameters';
    mode: bigint;
    body: Cell | null;
    value: bigint;
    to: Address;
    bounce: boolean;
}

export function storeMessageParameters(src: MessageParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeAddress(src.to);
        b_0.storeBit(src.bounce);
    };
}

export function loadMessageParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _to = sc_0.loadAddress();
    const _bounce = sc_0.loadBit();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

function loadTupleMessageParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

function loadGetterTupleMessageParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

function storeTupleMessageParameters(source: MessageParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeNumber(source.value);
    builder.writeAddress(source.to);
    builder.writeBoolean(source.bounce);
    return builder.build();
}

function dictValueParserMessageParameters(): DictionaryValue<MessageParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMessageParameters(src)).endCell());
        },
        parse: (src) => {
            return loadMessageParameters(src.loadRef().beginParse());
        }
    }
}

export type DeployParameters = {
    $$type: 'DeployParameters';
    mode: bigint;
    body: Cell | null;
    value: bigint;
    bounce: boolean;
    init: StateInit;
}

export function storeDeployParameters(src: DeployParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeBit(src.bounce);
        b_0.store(storeStateInit(src.init));
    };
}

export function loadDeployParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _bounce = sc_0.loadBit();
    const _init = loadStateInit(sc_0);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

function loadTupleDeployParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadTupleStateInit(source);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

function loadGetterTupleDeployParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadGetterTupleStateInit(source);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

function storeTupleDeployParameters(source: DeployParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeNumber(source.value);
    builder.writeBoolean(source.bounce);
    builder.writeTuple(storeTupleStateInit(source.init));
    return builder.build();
}

function dictValueParserDeployParameters(): DictionaryValue<DeployParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployParameters(src)).endCell());
        },
        parse: (src) => {
            return loadDeployParameters(src.loadRef().beginParse());
        }
    }
}

export type StdAddress = {
    $$type: 'StdAddress';
    workchain: bigint;
    address: bigint;
}

export function storeStdAddress(src: StdAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.workchain, 8);
        b_0.storeUint(src.address, 256);
    };
}

export function loadStdAddress(slice: Slice) {
    const sc_0 = slice;
    const _workchain = sc_0.loadIntBig(8);
    const _address = sc_0.loadUintBig(256);
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleStdAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleStdAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function storeTupleStdAddress(source: StdAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeNumber(source.address);
    return builder.build();
}

function dictValueParserStdAddress(): DictionaryValue<StdAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStdAddress(src)).endCell());
        },
        parse: (src) => {
            return loadStdAddress(src.loadRef().beginParse());
        }
    }
}

export type VarAddress = {
    $$type: 'VarAddress';
    workchain: bigint;
    address: Slice;
}

export function storeVarAddress(src: VarAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.workchain, 32);
        b_0.storeRef(src.address.asCell());
    };
}

export function loadVarAddress(slice: Slice) {
    const sc_0 = slice;
    const _workchain = sc_0.loadIntBig(32);
    const _address = sc_0.loadRef().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleVarAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleVarAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function storeTupleVarAddress(source: VarAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeSlice(source.address.asCell());
    return builder.build();
}

function dictValueParserVarAddress(): DictionaryValue<VarAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVarAddress(src)).endCell());
        },
        parse: (src) => {
            return loadVarAddress(src.loadRef().beginParse());
        }
    }
}

export type BasechainAddress = {
    $$type: 'BasechainAddress';
    hash: bigint | null;
}

export function storeBasechainAddress(src: BasechainAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        if (src.hash !== null && src.hash !== undefined) { b_0.storeBit(true).storeInt(src.hash, 257); } else { b_0.storeBit(false); }
    };
}

export function loadBasechainAddress(slice: Slice) {
    const sc_0 = slice;
    const _hash = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

function loadTupleBasechainAddress(source: TupleReader) {
    const _hash = source.readBigNumberOpt();
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

function loadGetterTupleBasechainAddress(source: TupleReader) {
    const _hash = source.readBigNumberOpt();
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

function storeTupleBasechainAddress(source: BasechainAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.hash);
    return builder.build();
}

function dictValueParserBasechainAddress(): DictionaryValue<BasechainAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBasechainAddress(src)).endCell());
        },
        parse: (src) => {
            return loadBasechainAddress(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadGetterTupleChangeOwner(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadGetterTupleChangeOwnerOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadGetterTupleDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadGetterTupleDeployOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadGetterTupleFactoryDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type Excesses = {
    $$type: 'Excesses';
    queryId: bigint;
}

export function storeExcesses(src: Excesses) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadExcesses(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Excesses' as const, queryId: _queryId };
}

function loadTupleExcesses(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'Excesses' as const, queryId: _queryId };
}

function loadGetterTupleExcesses(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'Excesses' as const, queryId: _queryId };
}

function storeTupleExcesses(source: Excesses) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserExcesses(): DictionaryValue<Excesses> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadExcesses(src.loadRef().beginParse());
        }
    }
}

export type GetRoyaltyParams = {
    $$type: 'GetRoyaltyParams';
    queryId: bigint;
}

export function storeGetRoyaltyParams(src: GetRoyaltyParams) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1765620048, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadGetRoyaltyParams(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1765620048) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'GetRoyaltyParams' as const, queryId: _queryId };
}

function loadTupleGetRoyaltyParams(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'GetRoyaltyParams' as const, queryId: _queryId };
}

function loadGetterTupleGetRoyaltyParams(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'GetRoyaltyParams' as const, queryId: _queryId };
}

function storeTupleGetRoyaltyParams(source: GetRoyaltyParams) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserGetRoyaltyParams(): DictionaryValue<GetRoyaltyParams> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGetRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadGetRoyaltyParams(src.loadRef().beginParse());
        }
    }
}

export type ReportRoyaltyParams = {
    $$type: 'ReportRoyaltyParams';
    queryId: bigint;
    numerator: bigint;
    denominator: bigint;
    destination: Address;
}

export function storeReportRoyaltyParams(src: ReportRoyaltyParams) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2831876269, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeUint(src.numerator, 16);
        b_0.storeCoins(src.denominator);
        b_0.storeAddress(src.destination);
    };
}

export function loadReportRoyaltyParams(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2831876269) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _numerator = sc_0.loadUintBig(16);
    const _denominator = sc_0.loadCoins();
    const _destination = sc_0.loadAddress();
    return { $$type: 'ReportRoyaltyParams' as const, queryId: _queryId, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function loadTupleReportRoyaltyParams(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _numerator = source.readBigNumber();
    const _denominator = source.readBigNumber();
    const _destination = source.readAddress();
    return { $$type: 'ReportRoyaltyParams' as const, queryId: _queryId, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function loadGetterTupleReportRoyaltyParams(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _numerator = source.readBigNumber();
    const _denominator = source.readBigNumber();
    const _destination = source.readAddress();
    return { $$type: 'ReportRoyaltyParams' as const, queryId: _queryId, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function storeTupleReportRoyaltyParams(source: ReportRoyaltyParams) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.numerator);
    builder.writeNumber(source.denominator);
    builder.writeAddress(source.destination);
    return builder.build();
}

function dictValueParserReportRoyaltyParams(): DictionaryValue<ReportRoyaltyParams> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeReportRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadReportRoyaltyParams(src.loadRef().beginParse());
        }
    }
}

export type NFTTransfer = {
    $$type: 'NFTTransfer';
    queryId: bigint;
    newOwner: Address;
    responseDestination: Address;
    customPayload: Cell | null;
    forwardAmount: bigint;
    forwardPayload: Cell;
}

export function storeNFTTransfer(src: NFTTransfer) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1607220500, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
        b_0.storeAddress(src.responseDestination);
        if (src.customPayload !== null && src.customPayload !== undefined) { b_0.storeBit(true).storeRef(src.customPayload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forwardAmount);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadNFTTransfer(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1607220500) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _newOwner = sc_0.loadAddress();
    const _responseDestination = sc_0.loadAddress();
    const _customPayload = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _forwardAmount = sc_0.loadCoins();
    const _forwardPayload = sc_0.asCell();
    return { $$type: 'NFTTransfer' as const, queryId: _queryId, newOwner: _newOwner, responseDestination: _responseDestination, customPayload: _customPayload, forwardAmount: _forwardAmount, forwardPayload: _forwardPayload };
}

function loadTupleNFTTransfer(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    const _responseDestination = source.readAddress();
    const _customPayload = source.readCellOpt();
    const _forwardAmount = source.readBigNumber();
    const _forwardPayload = source.readCell();
    return { $$type: 'NFTTransfer' as const, queryId: _queryId, newOwner: _newOwner, responseDestination: _responseDestination, customPayload: _customPayload, forwardAmount: _forwardAmount, forwardPayload: _forwardPayload };
}

function loadGetterTupleNFTTransfer(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    const _responseDestination = source.readAddress();
    const _customPayload = source.readCellOpt();
    const _forwardAmount = source.readBigNumber();
    const _forwardPayload = source.readCell();
    return { $$type: 'NFTTransfer' as const, queryId: _queryId, newOwner: _newOwner, responseDestination: _responseDestination, customPayload: _customPayload, forwardAmount: _forwardAmount, forwardPayload: _forwardPayload };
}

function storeTupleNFTTransfer(source: NFTTransfer) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    builder.writeAddress(source.responseDestination);
    builder.writeCell(source.customPayload);
    builder.writeNumber(source.forwardAmount);
    builder.writeCell(source.forwardPayload);
    return builder.build();
}

function dictValueParserNFTTransfer(): DictionaryValue<NFTTransfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNFTTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadNFTTransfer(src.loadRef().beginParse());
        }
    }
}

export type OwnershipAssigned = {
    $$type: 'OwnershipAssigned';
    queryId: bigint;
    prevOwner: Address;
    forwardPayload: Cell;
}

export function storeOwnershipAssigned(src: OwnershipAssigned) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(85167505, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.prevOwner);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadOwnershipAssigned(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 85167505) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _prevOwner = sc_0.loadAddress();
    const _forwardPayload = sc_0.asCell();
    return { $$type: 'OwnershipAssigned' as const, queryId: _queryId, prevOwner: _prevOwner, forwardPayload: _forwardPayload };
}

function loadTupleOwnershipAssigned(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _prevOwner = source.readAddress();
    const _forwardPayload = source.readCell();
    return { $$type: 'OwnershipAssigned' as const, queryId: _queryId, prevOwner: _prevOwner, forwardPayload: _forwardPayload };
}

function loadGetterTupleOwnershipAssigned(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _prevOwner = source.readAddress();
    const _forwardPayload = source.readCell();
    return { $$type: 'OwnershipAssigned' as const, queryId: _queryId, prevOwner: _prevOwner, forwardPayload: _forwardPayload };
}

function storeTupleOwnershipAssigned(source: OwnershipAssigned) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.prevOwner);
    builder.writeCell(source.forwardPayload);
    return builder.build();
}

function dictValueParserOwnershipAssigned(): DictionaryValue<OwnershipAssigned> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeOwnershipAssigned(src)).endCell());
        },
        parse: (src) => {
            return loadOwnershipAssigned(src.loadRef().beginParse());
        }
    }
}

export type GetStaticData = {
    $$type: 'GetStaticData';
    queryId: bigint;
}

export function storeGetStaticData(src: GetStaticData) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(801842850, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadGetStaticData(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 801842850) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'GetStaticData' as const, queryId: _queryId };
}

function loadTupleGetStaticData(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'GetStaticData' as const, queryId: _queryId };
}

function loadGetterTupleGetStaticData(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'GetStaticData' as const, queryId: _queryId };
}

function storeTupleGetStaticData(source: GetStaticData) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserGetStaticData(): DictionaryValue<GetStaticData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGetStaticData(src)).endCell());
        },
        parse: (src) => {
            return loadGetStaticData(src.loadRef().beginParse());
        }
    }
}

export type ReportStaticData = {
    $$type: 'ReportStaticData';
    queryId: bigint;
    index: bigint;
    collection: Address;
}

export function storeReportStaticData(src: ReportStaticData) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2339837749, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeUint(src.index, 256);
        b_0.storeAddress(src.collection);
    };
}

export function loadReportStaticData(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2339837749) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _index = sc_0.loadUintBig(256);
    const _collection = sc_0.loadAddress();
    return { $$type: 'ReportStaticData' as const, queryId: _queryId, index: _index, collection: _collection };
}

function loadTupleReportStaticData(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _index = source.readBigNumber();
    const _collection = source.readAddress();
    return { $$type: 'ReportStaticData' as const, queryId: _queryId, index: _index, collection: _collection };
}

function loadGetterTupleReportStaticData(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _index = source.readBigNumber();
    const _collection = source.readAddress();
    return { $$type: 'ReportStaticData' as const, queryId: _queryId, index: _index, collection: _collection };
}

function storeTupleReportStaticData(source: ReportStaticData) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.index);
    builder.writeAddress(source.collection);
    return builder.build();
}

function dictValueParserReportStaticData(): DictionaryValue<ReportStaticData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeReportStaticData(src)).endCell());
        },
        parse: (src) => {
            return loadReportStaticData(src.loadRef().beginParse());
        }
    }
}

export type GetNftData = {
    $$type: 'GetNftData';
    init: boolean;
    index: bigint;
    collectionAddress: Address;
    ownerAddress: Address;
    individualContent: Cell;
}

export function storeGetNftData(src: GetNftData) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeBit(src.init);
        b_0.storeUint(src.index, 256);
        b_0.storeAddress(src.collectionAddress);
        b_0.storeAddress(src.ownerAddress);
        b_0.storeRef(src.individualContent);
    };
}

export function loadGetNftData(slice: Slice) {
    const sc_0 = slice;
    const _init = sc_0.loadBit();
    const _index = sc_0.loadUintBig(256);
    const _collectionAddress = sc_0.loadAddress();
    const _ownerAddress = sc_0.loadAddress();
    const _individualContent = sc_0.loadRef();
    return { $$type: 'GetNftData' as const, init: _init, index: _index, collectionAddress: _collectionAddress, ownerAddress: _ownerAddress, individualContent: _individualContent };
}

function loadTupleGetNftData(source: TupleReader) {
    const _init = source.readBoolean();
    const _index = source.readBigNumber();
    const _collectionAddress = source.readAddress();
    const _ownerAddress = source.readAddress();
    const _individualContent = source.readCell();
    return { $$type: 'GetNftData' as const, init: _init, index: _index, collectionAddress: _collectionAddress, ownerAddress: _ownerAddress, individualContent: _individualContent };
}

function loadGetterTupleGetNftData(source: TupleReader) {
    const _init = source.readBoolean();
    const _index = source.readBigNumber();
    const _collectionAddress = source.readAddress();
    const _ownerAddress = source.readAddress();
    const _individualContent = source.readCell();
    return { $$type: 'GetNftData' as const, init: _init, index: _index, collectionAddress: _collectionAddress, ownerAddress: _ownerAddress, individualContent: _individualContent };
}

function storeTupleGetNftData(source: GetNftData) {
    const builder = new TupleBuilder();
    builder.writeBoolean(source.init);
    builder.writeNumber(source.index);
    builder.writeAddress(source.collectionAddress);
    builder.writeAddress(source.ownerAddress);
    builder.writeCell(source.individualContent);
    return builder.build();
}

function dictValueParserGetNftData(): DictionaryValue<GetNftData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGetNftData(src)).endCell());
        },
        parse: (src) => {
            return loadGetNftData(src.loadRef().beginParse());
        }
    }
}

export type CollectionData = {
    $$type: 'CollectionData';
    nextItemIndex: bigint;
    collectionContent: Cell;
    ownerAddress: Address;
}

export function storeCollectionData(src: CollectionData) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.nextItemIndex, 257);
        b_0.storeRef(src.collectionContent);
        b_0.storeAddress(src.ownerAddress);
    };
}

export function loadCollectionData(slice: Slice) {
    const sc_0 = slice;
    const _nextItemIndex = sc_0.loadIntBig(257);
    const _collectionContent = sc_0.loadRef();
    const _ownerAddress = sc_0.loadAddress();
    return { $$type: 'CollectionData' as const, nextItemIndex: _nextItemIndex, collectionContent: _collectionContent, ownerAddress: _ownerAddress };
}

function loadTupleCollectionData(source: TupleReader) {
    const _nextItemIndex = source.readBigNumber();
    const _collectionContent = source.readCell();
    const _ownerAddress = source.readAddress();
    return { $$type: 'CollectionData' as const, nextItemIndex: _nextItemIndex, collectionContent: _collectionContent, ownerAddress: _ownerAddress };
}

function loadGetterTupleCollectionData(source: TupleReader) {
    const _nextItemIndex = source.readBigNumber();
    const _collectionContent = source.readCell();
    const _ownerAddress = source.readAddress();
    return { $$type: 'CollectionData' as const, nextItemIndex: _nextItemIndex, collectionContent: _collectionContent, ownerAddress: _ownerAddress };
}

function storeTupleCollectionData(source: CollectionData) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.nextItemIndex);
    builder.writeCell(source.collectionContent);
    builder.writeAddress(source.ownerAddress);
    return builder.build();
}

function dictValueParserCollectionData(): DictionaryValue<CollectionData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCollectionData(src)).endCell());
        },
        parse: (src) => {
            return loadCollectionData(src.loadRef().beginParse());
        }
    }
}

export type RoyaltyParams = {
    $$type: 'RoyaltyParams';
    numerator: bigint;
    denominator: bigint;
    destination: Address;
}

export function storeRoyaltyParams(src: RoyaltyParams) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.numerator, 257);
        b_0.storeInt(src.denominator, 257);
        b_0.storeAddress(src.destination);
    };
}

export function loadRoyaltyParams(slice: Slice) {
    const sc_0 = slice;
    const _numerator = sc_0.loadIntBig(257);
    const _denominator = sc_0.loadIntBig(257);
    const _destination = sc_0.loadAddress();
    return { $$type: 'RoyaltyParams' as const, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function loadTupleRoyaltyParams(source: TupleReader) {
    const _numerator = source.readBigNumber();
    const _denominator = source.readBigNumber();
    const _destination = source.readAddress();
    return { $$type: 'RoyaltyParams' as const, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function loadGetterTupleRoyaltyParams(source: TupleReader) {
    const _numerator = source.readBigNumber();
    const _denominator = source.readBigNumber();
    const _destination = source.readAddress();
    return { $$type: 'RoyaltyParams' as const, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function storeTupleRoyaltyParams(source: RoyaltyParams) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.numerator);
    builder.writeNumber(source.denominator);
    builder.writeAddress(source.destination);
    return builder.build();
}

function dictValueParserRoyaltyParams(): DictionaryValue<RoyaltyParams> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadRoyaltyParams(src.loadRef().beginParse());
        }
    }
}

export type Tep64TokenData = {
    $$type: 'Tep64TokenData';
    flag: bigint;
    content: string;
}

export function storeTep64TokenData(src: Tep64TokenData) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(src.flag, 8);
        b_0.storeStringRefTail(src.content);
    };
}

export function loadTep64TokenData(slice: Slice) {
    const sc_0 = slice;
    const _flag = sc_0.loadUintBig(8);
    const _content = sc_0.loadStringRefTail();
    return { $$type: 'Tep64TokenData' as const, flag: _flag, content: _content };
}

function loadTupleTep64TokenData(source: TupleReader) {
    const _flag = source.readBigNumber();
    const _content = source.readString();
    return { $$type: 'Tep64TokenData' as const, flag: _flag, content: _content };
}

function loadGetterTupleTep64TokenData(source: TupleReader) {
    const _flag = source.readBigNumber();
    const _content = source.readString();
    return { $$type: 'Tep64TokenData' as const, flag: _flag, content: _content };
}

function storeTupleTep64TokenData(source: Tep64TokenData) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.flag);
    builder.writeString(source.content);
    return builder.build();
}

function dictValueParserTep64TokenData(): DictionaryValue<Tep64TokenData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTep64TokenData(src)).endCell());
        },
        parse: (src) => {
            return loadTep64TokenData(src.loadRef().beginParse());
        }
    }
}

export type SetStaticTax = {
    $$type: 'SetStaticTax';
    staticTax: bigint;
}

export function storeSetStaticTax(src: SetStaticTax) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(352953376, 32);
        b_0.storeCoins(src.staticTax);
    };
}

export function loadSetStaticTax(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 352953376) { throw Error('Invalid prefix'); }
    const _staticTax = sc_0.loadCoins();
    return { $$type: 'SetStaticTax' as const, staticTax: _staticTax };
}

function loadTupleSetStaticTax(source: TupleReader) {
    const _staticTax = source.readBigNumber();
    return { $$type: 'SetStaticTax' as const, staticTax: _staticTax };
}

function loadGetterTupleSetStaticTax(source: TupleReader) {
    const _staticTax = source.readBigNumber();
    return { $$type: 'SetStaticTax' as const, staticTax: _staticTax };
}

function storeTupleSetStaticTax(source: SetStaticTax) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.staticTax);
    return builder.build();
}

function dictValueParserSetStaticTax(): DictionaryValue<SetStaticTax> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetStaticTax(src)).endCell());
        },
        parse: (src) => {
            return loadSetStaticTax(src.loadRef().beginParse());
        }
    }
}

export type UpgradeContract = {
    $$type: 'UpgradeContract';
    queryId: bigint;
    code: Cell | null;
    data: Cell | null;
    responseDestination: Address;
}

export function storeUpgradeContract(src: UpgradeContract) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(288003337, 32);
        b_0.storeInt(src.queryId, 257);
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
        b_0.storeAddress(src.responseDestination);
    };
}

export function loadUpgradeContract(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 288003337) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadIntBig(257);
    const _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _responseDestination = sc_0.loadAddress();
    return { $$type: 'UpgradeContract' as const, queryId: _queryId, code: _code, data: _data, responseDestination: _responseDestination };
}

function loadTupleUpgradeContract(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _responseDestination = source.readAddress();
    return { $$type: 'UpgradeContract' as const, queryId: _queryId, code: _code, data: _data, responseDestination: _responseDestination };
}

function loadGetterTupleUpgradeContract(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _responseDestination = source.readAddress();
    return { $$type: 'UpgradeContract' as const, queryId: _queryId, code: _code, data: _data, responseDestination: _responseDestination };
}

function storeTupleUpgradeContract(source: UpgradeContract) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    builder.writeAddress(source.responseDestination);
    return builder.build();
}

function dictValueParserUpgradeContract(): DictionaryValue<UpgradeContract> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpgradeContract(src)).endCell());
        },
        parse: (src) => {
            return loadUpgradeContract(src.loadRef().beginParse());
        }
    }
}

export type MerkleProof = {
    $$type: 'MerkleProof';
    data: Cell;
    root: bigint;
    proof: Dictionary<number, bigint>;
    proofLen: bigint;
}

export function storeMerkleProof(src: MerkleProof) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeRef(src.data);
        b_0.storeUint(src.root, 256);
        b_0.storeDict(src.proof, Dictionary.Keys.Uint(32), Dictionary.Values.BigUint(256));
        b_0.storeUint(src.proofLen, 32);
    };
}

export function loadMerkleProof(slice: Slice) {
    const sc_0 = slice;
    const _data = sc_0.loadRef();
    const _root = sc_0.loadUintBig(256);
    const _proof = Dictionary.load(Dictionary.Keys.Uint(32), Dictionary.Values.BigUint(256), sc_0);
    const _proofLen = sc_0.loadUintBig(32);
    return { $$type: 'MerkleProof' as const, data: _data, root: _root, proof: _proof, proofLen: _proofLen };
}

function loadTupleMerkleProof(source: TupleReader) {
    const _data = source.readCell();
    const _root = source.readBigNumber();
    const _proof = Dictionary.loadDirect(Dictionary.Keys.Uint(32), Dictionary.Values.BigUint(256), source.readCellOpt());
    const _proofLen = source.readBigNumber();
    return { $$type: 'MerkleProof' as const, data: _data, root: _root, proof: _proof, proofLen: _proofLen };
}

function loadGetterTupleMerkleProof(source: TupleReader) {
    const _data = source.readCell();
    const _root = source.readBigNumber();
    const _proof = Dictionary.loadDirect(Dictionary.Keys.Uint(32), Dictionary.Values.BigUint(256), source.readCellOpt());
    const _proofLen = source.readBigNumber();
    return { $$type: 'MerkleProof' as const, data: _data, root: _root, proof: _proof, proofLen: _proofLen };
}

function storeTupleMerkleProof(source: MerkleProof) {
    const builder = new TupleBuilder();
    builder.writeCell(source.data);
    builder.writeNumber(source.root);
    builder.writeCell(source.proof.size > 0 ? beginCell().storeDictDirect(source.proof, Dictionary.Keys.Uint(32), Dictionary.Values.BigUint(256)).endCell() : null);
    builder.writeNumber(source.proofLen);
    return builder.build();
}

function dictValueParserMerkleProof(): DictionaryValue<MerkleProof> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMerkleProof(src)).endCell());
        },
        parse: (src) => {
            return loadMerkleProof(src.loadRef().beginParse());
        }
    }
}

export type MintNFT = {
    $$type: 'MintNFT';
    queryId: bigint;
    receiver: Address;
    responseDestination: Address;
    forwardAmount: bigint;
    forwardPayload: Cell;
}

export function storeMintNFT(src: MintNFT) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3845502486, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.receiver);
        b_0.storeAddress(src.responseDestination);
        b_0.storeCoins(src.forwardAmount);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadMintNFT(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3845502486) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _receiver = sc_0.loadAddress();
    const _responseDestination = sc_0.loadAddress();
    const _forwardAmount = sc_0.loadCoins();
    const _forwardPayload = sc_0.asCell();
    return { $$type: 'MintNFT' as const, queryId: _queryId, receiver: _receiver, responseDestination: _responseDestination, forwardAmount: _forwardAmount, forwardPayload: _forwardPayload };
}

function loadTupleMintNFT(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _receiver = source.readAddress();
    const _responseDestination = source.readAddress();
    const _forwardAmount = source.readBigNumber();
    const _forwardPayload = source.readCell();
    return { $$type: 'MintNFT' as const, queryId: _queryId, receiver: _receiver, responseDestination: _responseDestination, forwardAmount: _forwardAmount, forwardPayload: _forwardPayload };
}

function loadGetterTupleMintNFT(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _receiver = source.readAddress();
    const _responseDestination = source.readAddress();
    const _forwardAmount = source.readBigNumber();
    const _forwardPayload = source.readCell();
    return { $$type: 'MintNFT' as const, queryId: _queryId, receiver: _receiver, responseDestination: _responseDestination, forwardAmount: _forwardAmount, forwardPayload: _forwardPayload };
}

function storeTupleMintNFT(source: MintNFT) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.receiver);
    builder.writeAddress(source.responseDestination);
    builder.writeNumber(source.forwardAmount);
    builder.writeCell(source.forwardPayload);
    return builder.build();
}

function dictValueParserMintNFT(): DictionaryValue<MintNFT> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMintNFT(src)).endCell());
        },
        parse: (src) => {
            return loadMintNFT(src.loadRef().beginParse());
        }
    }
}

export type MintNFTWithIndex = {
    $$type: 'MintNFTWithIndex';
    queryId: bigint;
    itemIndex: bigint;
    receiver: Address;
    responseDestination: Address;
    forwardAmount: bigint;
    forwardPayload: Cell;
}

export function storeMintNFTWithIndex(src: MintNFTWithIndex) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3000, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeUint(src.itemIndex, 256);
        b_0.storeAddress(src.receiver);
        b_0.storeAddress(src.responseDestination);
        b_0.storeCoins(src.forwardAmount);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadMintNFTWithIndex(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3000) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _itemIndex = sc_0.loadUintBig(256);
    const _receiver = sc_0.loadAddress();
    const _responseDestination = sc_0.loadAddress();
    const _forwardAmount = sc_0.loadCoins();
    const _forwardPayload = sc_0.asCell();
    return { $$type: 'MintNFTWithIndex' as const, queryId: _queryId, itemIndex: _itemIndex, receiver: _receiver, responseDestination: _responseDestination, forwardAmount: _forwardAmount, forwardPayload: _forwardPayload };
}

function loadTupleMintNFTWithIndex(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _itemIndex = source.readBigNumber();
    const _receiver = source.readAddress();
    const _responseDestination = source.readAddress();
    const _forwardAmount = source.readBigNumber();
    const _forwardPayload = source.readCell();
    return { $$type: 'MintNFTWithIndex' as const, queryId: _queryId, itemIndex: _itemIndex, receiver: _receiver, responseDestination: _responseDestination, forwardAmount: _forwardAmount, forwardPayload: _forwardPayload };
}

function loadGetterTupleMintNFTWithIndex(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _itemIndex = source.readBigNumber();
    const _receiver = source.readAddress();
    const _responseDestination = source.readAddress();
    const _forwardAmount = source.readBigNumber();
    const _forwardPayload = source.readCell();
    return { $$type: 'MintNFTWithIndex' as const, queryId: _queryId, itemIndex: _itemIndex, receiver: _receiver, responseDestination: _responseDestination, forwardAmount: _forwardAmount, forwardPayload: _forwardPayload };
}

function storeTupleMintNFTWithIndex(source: MintNFTWithIndex) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.itemIndex);
    builder.writeAddress(source.receiver);
    builder.writeAddress(source.responseDestination);
    builder.writeNumber(source.forwardAmount);
    builder.writeCell(source.forwardPayload);
    return builder.build();
}

function dictValueParserMintNFTWithIndex(): DictionaryValue<MintNFTWithIndex> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMintNFTWithIndex(src)).endCell());
        },
        parse: (src) => {
            return loadMintNFTWithIndex(src.loadRef().beginParse());
        }
    }
}

export type UpdateCollection = {
    $$type: 'UpdateCollection';
    queryId: bigint;
    responseDestination: Address;
    collectionContent: Tep64TokenData | null;
    itemContentUrlPrefix: string | null;
    royalty: RoyaltyParams | null;
}

export function storeUpdateCollection(src: UpdateCollection) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1218840839, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.responseDestination);
        if (src.collectionContent !== null && src.collectionContent !== undefined) { b_0.storeBit(true); b_0.store(storeTep64TokenData(src.collectionContent)); } else { b_0.storeBit(false); }
        if (src.itemContentUrlPrefix !== null && src.itemContentUrlPrefix !== undefined) { b_0.storeBit(true).storeStringRefTail(src.itemContentUrlPrefix); } else { b_0.storeBit(false); }
        const b_1 = new Builder();
        if (src.royalty !== null && src.royalty !== undefined) { b_1.storeBit(true); b_1.store(storeRoyaltyParams(src.royalty)); } else { b_1.storeBit(false); }
        b_0.storeRef(b_1.endCell());
    };
}

export function loadUpdateCollection(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1218840839) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _responseDestination = sc_0.loadAddress();
    const _collectionContent = sc_0.loadBit() ? loadTep64TokenData(sc_0) : null;
    const _itemContentUrlPrefix = sc_0.loadBit() ? sc_0.loadStringRefTail() : null;
    const sc_1 = sc_0.loadRef().beginParse();
    const _royalty = sc_1.loadBit() ? loadRoyaltyParams(sc_1) : null;
    return { $$type: 'UpdateCollection' as const, queryId: _queryId, responseDestination: _responseDestination, collectionContent: _collectionContent, itemContentUrlPrefix: _itemContentUrlPrefix, royalty: _royalty };
}

function loadTupleUpdateCollection(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _responseDestination = source.readAddress();
    const _collectionContent_p = source.readTupleOpt();
    const _collectionContent = _collectionContent_p ? loadTupleTep64TokenData(_collectionContent_p) : null;
    const _itemContentUrlPrefix = source.readStringOpt();
    const _royalty_p = source.readTupleOpt();
    const _royalty = _royalty_p ? loadTupleRoyaltyParams(_royalty_p) : null;
    return { $$type: 'UpdateCollection' as const, queryId: _queryId, responseDestination: _responseDestination, collectionContent: _collectionContent, itemContentUrlPrefix: _itemContentUrlPrefix, royalty: _royalty };
}

function loadGetterTupleUpdateCollection(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _responseDestination = source.readAddress();
    const _collectionContent_p = source.readTupleOpt();
    const _collectionContent = _collectionContent_p ? loadTupleTep64TokenData(_collectionContent_p) : null;
    const _itemContentUrlPrefix = source.readStringOpt();
    const _royalty_p = source.readTupleOpt();
    const _royalty = _royalty_p ? loadTupleRoyaltyParams(_royalty_p) : null;
    return { $$type: 'UpdateCollection' as const, queryId: _queryId, responseDestination: _responseDestination, collectionContent: _collectionContent, itemContentUrlPrefix: _itemContentUrlPrefix, royalty: _royalty };
}

function storeTupleUpdateCollection(source: UpdateCollection) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.responseDestination);
    if (source.collectionContent !== null && source.collectionContent !== undefined) {
        builder.writeTuple(storeTupleTep64TokenData(source.collectionContent));
    } else {
        builder.writeTuple(null);
    }
    builder.writeString(source.itemContentUrlPrefix);
    if (source.royalty !== null && source.royalty !== undefined) {
        builder.writeTuple(storeTupleRoyaltyParams(source.royalty));
    } else {
        builder.writeTuple(null);
    }
    return builder.build();
}

function dictValueParserUpdateCollection(): DictionaryValue<UpdateCollection> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateCollection(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateCollection(src.loadRef().beginParse());
        }
    }
}

export type UpdateExchanger = {
    $$type: 'UpdateExchanger';
    exchanger: Address;
}

export function storeUpdateExchanger(src: UpdateExchanger) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3001, 32);
        b_0.storeAddress(src.exchanger);
    };
}

export function loadUpdateExchanger(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3001) { throw Error('Invalid prefix'); }
    const _exchanger = sc_0.loadAddress();
    return { $$type: 'UpdateExchanger' as const, exchanger: _exchanger };
}

function loadTupleUpdateExchanger(source: TupleReader) {
    const _exchanger = source.readAddress();
    return { $$type: 'UpdateExchanger' as const, exchanger: _exchanger };
}

function loadGetterTupleUpdateExchanger(source: TupleReader) {
    const _exchanger = source.readAddress();
    return { $$type: 'UpdateExchanger' as const, exchanger: _exchanger };
}

function storeTupleUpdateExchanger(source: UpdateExchanger) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.exchanger);
    return builder.build();
}

function dictValueParserUpdateExchanger(): DictionaryValue<UpdateExchanger> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateExchanger(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateExchanger(src.loadRef().beginParse());
        }
    }
}

export type NftItemInitForwardPayload = {
    $$type: 'NftItemInitForwardPayload';
    index: bigint;
}

export function storeNftItemInitForwardPayload(src: NftItemInitForwardPayload) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(src.index, 256);
    };
}

export function loadNftItemInitForwardPayload(slice: Slice) {
    const sc_0 = slice;
    const _index = sc_0.loadUintBig(256);
    return { $$type: 'NftItemInitForwardPayload' as const, index: _index };
}

function loadTupleNftItemInitForwardPayload(source: TupleReader) {
    const _index = source.readBigNumber();
    return { $$type: 'NftItemInitForwardPayload' as const, index: _index };
}

function loadGetterTupleNftItemInitForwardPayload(source: TupleReader) {
    const _index = source.readBigNumber();
    return { $$type: 'NftItemInitForwardPayload' as const, index: _index };
}

function storeTupleNftItemInitForwardPayload(source: NftItemInitForwardPayload) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.index);
    return builder.build();
}

function dictValueParserNftItemInitForwardPayload(): DictionaryValue<NftItemInitForwardPayload> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNftItemInitForwardPayload(src)).endCell());
        },
        parse: (src) => {
            return loadNftItemInitForwardPayload(src.loadRef().beginParse());
        }
    }
}

export type ChangeCollectionOwner = {
    $$type: 'ChangeCollectionOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeCollectionOwner(src: ChangeCollectionOwner) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeCollectionOwner(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeCollectionOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeCollectionOwner(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeCollectionOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadGetterTupleChangeCollectionOwner(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeCollectionOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeCollectionOwner(source: ChangeCollectionOwner) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeCollectionOwner(): DictionaryValue<ChangeCollectionOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeCollectionOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeCollectionOwner(src.loadRef().beginParse());
        }
    }
}

export type JettonTransferNotification = {
    $$type: 'JettonTransferNotification';
    queryId: bigint;
    amount: bigint;
    sender: Address;
    forwardPayload: Slice;
}

export function storeJettonTransferNotification(src: JettonTransferNotification) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadJettonTransferNotification(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _amount = sc_0.loadCoins();
    const _sender = sc_0.loadAddress();
    const _forwardPayload = sc_0;
    return { $$type: 'JettonTransferNotification' as const, queryId: _queryId, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}

function loadTupleJettonTransferNotification(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'JettonTransferNotification' as const, queryId: _queryId, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}

function loadGetterTupleJettonTransferNotification(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'JettonTransferNotification' as const, queryId: _queryId, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}

function storeTupleJettonTransferNotification(source: JettonTransferNotification) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeSlice(source.forwardPayload.asCell());
    return builder.build();
}

function dictValueParserJettonTransferNotification(): DictionaryValue<JettonTransferNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonTransferNotification(src)).endCell());
        },
        parse: (src) => {
            return loadJettonTransferNotification(src.loadRef().beginParse());
        }
    }
}

export type JettonTransfer = {
    $$type: 'JettonTransfer';
    queryId: bigint;
    amount: bigint;
    destination: Address;
    responseDestination: Address;
    customPayload: Cell | null;
    forwardTonAmount: bigint;
    forwardPayload: Cell;
}

export function storeJettonTransfer(src: JettonTransfer) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(260734629, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.destination);
        b_0.storeAddress(src.responseDestination);
        if (src.customPayload !== null && src.customPayload !== undefined) { b_0.storeBit(true).storeRef(src.customPayload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forwardTonAmount);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadJettonTransfer(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _amount = sc_0.loadCoins();
    const _destination = sc_0.loadAddress();
    const _responseDestination = sc_0.loadAddress();
    const _customPayload = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _forwardTonAmount = sc_0.loadCoins();
    const _forwardPayload = sc_0.asCell();
    return { $$type: 'JettonTransfer' as const, queryId: _queryId, amount: _amount, destination: _destination, responseDestination: _responseDestination, customPayload: _customPayload, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

function loadTupleJettonTransfer(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _destination = source.readAddress();
    const _responseDestination = source.readAddress();
    const _customPayload = source.readCellOpt();
    const _forwardTonAmount = source.readBigNumber();
    const _forwardPayload = source.readCell();
    return { $$type: 'JettonTransfer' as const, queryId: _queryId, amount: _amount, destination: _destination, responseDestination: _responseDestination, customPayload: _customPayload, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

function loadGetterTupleJettonTransfer(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _destination = source.readAddress();
    const _responseDestination = source.readAddress();
    const _customPayload = source.readCellOpt();
    const _forwardTonAmount = source.readBigNumber();
    const _forwardPayload = source.readCell();
    return { $$type: 'JettonTransfer' as const, queryId: _queryId, amount: _amount, destination: _destination, responseDestination: _responseDestination, customPayload: _customPayload, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

function storeTupleJettonTransfer(source: JettonTransfer) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.destination);
    builder.writeAddress(source.responseDestination);
    builder.writeCell(source.customPayload);
    builder.writeNumber(source.forwardTonAmount);
    builder.writeCell(source.forwardPayload);
    return builder.build();
}

function dictValueParserJettonTransfer(): DictionaryValue<JettonTransfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadJettonTransfer(src.loadRef().beginParse());
        }
    }
}

export type JettonTransfer1 = {
    $$type: 'JettonTransfer1';
    queryId: bigint;
    amount: bigint;
    destination: Address;
    responseDestination: Address;
    customPayload: Cell | null;
    forwardTonAmount: bigint;
    forwardPayload: Cell | null;
}

export function storeJettonTransfer1(src: JettonTransfer1) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(260734629, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.destination);
        b_0.storeAddress(src.responseDestination);
        if (src.customPayload !== null && src.customPayload !== undefined) { b_0.storeBit(true).storeRef(src.customPayload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forwardTonAmount);
        if (src.forwardPayload !== null && src.forwardPayload !== undefined) { b_0.storeBit(true).storeRef(src.forwardPayload); } else { b_0.storeBit(false); }
    };
}

export function loadJettonTransfer1(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _amount = sc_0.loadCoins();
    const _destination = sc_0.loadAddress();
    const _responseDestination = sc_0.loadAddress();
    const _customPayload = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _forwardTonAmount = sc_0.loadCoins();
    const _forwardPayload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'JettonTransfer1' as const, queryId: _queryId, amount: _amount, destination: _destination, responseDestination: _responseDestination, customPayload: _customPayload, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

function loadTupleJettonTransfer1(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _destination = source.readAddress();
    const _responseDestination = source.readAddress();
    const _customPayload = source.readCellOpt();
    const _forwardTonAmount = source.readBigNumber();
    const _forwardPayload = source.readCellOpt();
    return { $$type: 'JettonTransfer1' as const, queryId: _queryId, amount: _amount, destination: _destination, responseDestination: _responseDestination, customPayload: _customPayload, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

function loadGetterTupleJettonTransfer1(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _destination = source.readAddress();
    const _responseDestination = source.readAddress();
    const _customPayload = source.readCellOpt();
    const _forwardTonAmount = source.readBigNumber();
    const _forwardPayload = source.readCellOpt();
    return { $$type: 'JettonTransfer1' as const, queryId: _queryId, amount: _amount, destination: _destination, responseDestination: _responseDestination, customPayload: _customPayload, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

function storeTupleJettonTransfer1(source: JettonTransfer1) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.destination);
    builder.writeAddress(source.responseDestination);
    builder.writeCell(source.customPayload);
    builder.writeNumber(source.forwardTonAmount);
    builder.writeCell(source.forwardPayload);
    return builder.build();
}

function dictValueParserJettonTransfer1(): DictionaryValue<JettonTransfer1> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonTransfer1(src)).endCell());
        },
        parse: (src) => {
            return loadJettonTransfer1(src.loadRef().beginParse());
        }
    }
}

export type Withdraw = {
    $$type: 'Withdraw';
    queryId: bigint;
    tokenAmount: bigint;
}

export function storeWithdraw(src: Withdraw) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1337, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeInt(src.tokenAmount, 257);
    };
}

export function loadWithdraw(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1337) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _tokenAmount = sc_0.loadIntBig(257);
    return { $$type: 'Withdraw' as const, queryId: _queryId, tokenAmount: _tokenAmount };
}

function loadTupleWithdraw(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _tokenAmount = source.readBigNumber();
    return { $$type: 'Withdraw' as const, queryId: _queryId, tokenAmount: _tokenAmount };
}

function loadGetterTupleWithdraw(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _tokenAmount = source.readBigNumber();
    return { $$type: 'Withdraw' as const, queryId: _queryId, tokenAmount: _tokenAmount };
}

function storeTupleWithdraw(source: Withdraw) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.tokenAmount);
    return builder.build();
}

function dictValueParserWithdraw(): DictionaryValue<Withdraw> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWithdraw(src)).endCell());
        },
        parse: (src) => {
            return loadWithdraw(src.loadRef().beginParse());
        }
    }
}

export type SetParameters = {
    $$type: 'SetParameters';
    newCollectionAddress: Address | null;
    newPriceInTokens: bigint | null;
    lastRewardDistribution: bigint | null;
}

export function storeSetParameters(src: SetParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1338, 32);
        b_0.storeAddress(src.newCollectionAddress);
        if (src.newPriceInTokens !== null && src.newPriceInTokens !== undefined) { b_0.storeBit(true).storeInt(src.newPriceInTokens, 257); } else { b_0.storeBit(false); }
        if (src.lastRewardDistribution !== null && src.lastRewardDistribution !== undefined) { b_0.storeBit(true).storeInt(src.lastRewardDistribution, 257); } else { b_0.storeBit(false); }
    };
}

export function loadSetParameters(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1338) { throw Error('Invalid prefix'); }
    const _newCollectionAddress = sc_0.loadMaybeAddress();
    const _newPriceInTokens = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    const _lastRewardDistribution = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    return { $$type: 'SetParameters' as const, newCollectionAddress: _newCollectionAddress, newPriceInTokens: _newPriceInTokens, lastRewardDistribution: _lastRewardDistribution };
}

function loadTupleSetParameters(source: TupleReader) {
    const _newCollectionAddress = source.readAddressOpt();
    const _newPriceInTokens = source.readBigNumberOpt();
    const _lastRewardDistribution = source.readBigNumberOpt();
    return { $$type: 'SetParameters' as const, newCollectionAddress: _newCollectionAddress, newPriceInTokens: _newPriceInTokens, lastRewardDistribution: _lastRewardDistribution };
}

function loadGetterTupleSetParameters(source: TupleReader) {
    const _newCollectionAddress = source.readAddressOpt();
    const _newPriceInTokens = source.readBigNumberOpt();
    const _lastRewardDistribution = source.readBigNumberOpt();
    return { $$type: 'SetParameters' as const, newCollectionAddress: _newCollectionAddress, newPriceInTokens: _newPriceInTokens, lastRewardDistribution: _lastRewardDistribution };
}

function storeTupleSetParameters(source: SetParameters) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.newCollectionAddress);
    builder.writeNumber(source.newPriceInTokens);
    builder.writeNumber(source.lastRewardDistribution);
    return builder.build();
}

function dictValueParserSetParameters(): DictionaryValue<SetParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSetParameters(src.loadRef().beginParse());
        }
    }
}

export type InitJettonWallet = {
    $$type: 'InitJettonWallet';
    address: Address;
    balance: bigint;
}

export function storeInitJettonWallet(src: InitJettonWallet) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1339, 32);
        b_0.storeAddress(src.address);
        b_0.storeCoins(src.balance);
    };
}

export function loadInitJettonWallet(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1339) { throw Error('Invalid prefix'); }
    const _address = sc_0.loadAddress();
    const _balance = sc_0.loadCoins();
    return { $$type: 'InitJettonWallet' as const, address: _address, balance: _balance };
}

function loadTupleInitJettonWallet(source: TupleReader) {
    const _address = source.readAddress();
    const _balance = source.readBigNumber();
    return { $$type: 'InitJettonWallet' as const, address: _address, balance: _balance };
}

function loadGetterTupleInitJettonWallet(source: TupleReader) {
    const _address = source.readAddress();
    const _balance = source.readBigNumber();
    return { $$type: 'InitJettonWallet' as const, address: _address, balance: _balance };
}

function storeTupleInitJettonWallet(source: InitJettonWallet) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.address);
    builder.writeNumber(source.balance);
    return builder.build();
}

function dictValueParserInitJettonWallet(): DictionaryValue<InitJettonWallet> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeInitJettonWallet(src)).endCell());
        },
        parse: (src) => {
            return loadInitJettonWallet(src.loadRef().beginParse());
        }
    }
}

export type CalculateDistribution = {
    $$type: 'CalculateDistribution';
    currentBalance: bigint | null;
}

export function storeCalculateDistribution(src: CalculateDistribution) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1340, 32);
        if (src.currentBalance !== null && src.currentBalance !== undefined) { b_0.storeBit(true).storeCoins(src.currentBalance); } else { b_0.storeBit(false); }
    };
}

export function loadCalculateDistribution(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1340) { throw Error('Invalid prefix'); }
    const _currentBalance = sc_0.loadBit() ? sc_0.loadCoins() : null;
    return { $$type: 'CalculateDistribution' as const, currentBalance: _currentBalance };
}

function loadTupleCalculateDistribution(source: TupleReader) {
    const _currentBalance = source.readBigNumberOpt();
    return { $$type: 'CalculateDistribution' as const, currentBalance: _currentBalance };
}

function loadGetterTupleCalculateDistribution(source: TupleReader) {
    const _currentBalance = source.readBigNumberOpt();
    return { $$type: 'CalculateDistribution' as const, currentBalance: _currentBalance };
}

function storeTupleCalculateDistribution(source: CalculateDistribution) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.currentBalance);
    return builder.build();
}

function dictValueParserCalculateDistribution(): DictionaryValue<CalculateDistribution> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCalculateDistribution(src)).endCell());
        },
        parse: (src) => {
            return loadCalculateDistribution(src.loadRef().beginParse());
        }
    }
}

export type CalculateDistributionChunk = {
    $$type: 'CalculateDistributionChunk';
    nextItemIndex: bigint;
    chunkSize: bigint;
    portion: bigint;
}

export function storeCalculateDistributionChunk(src: CalculateDistributionChunk) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1341, 32);
        b_0.storeUint(src.nextItemIndex, 256);
        b_0.storeUint(src.chunkSize, 16);
        b_0.storeCoins(src.portion);
    };
}

export function loadCalculateDistributionChunk(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1341) { throw Error('Invalid prefix'); }
    const _nextItemIndex = sc_0.loadUintBig(256);
    const _chunkSize = sc_0.loadUintBig(16);
    const _portion = sc_0.loadCoins();
    return { $$type: 'CalculateDistributionChunk' as const, nextItemIndex: _nextItemIndex, chunkSize: _chunkSize, portion: _portion };
}

function loadTupleCalculateDistributionChunk(source: TupleReader) {
    const _nextItemIndex = source.readBigNumber();
    const _chunkSize = source.readBigNumber();
    const _portion = source.readBigNumber();
    return { $$type: 'CalculateDistributionChunk' as const, nextItemIndex: _nextItemIndex, chunkSize: _chunkSize, portion: _portion };
}

function loadGetterTupleCalculateDistributionChunk(source: TupleReader) {
    const _nextItemIndex = source.readBigNumber();
    const _chunkSize = source.readBigNumber();
    const _portion = source.readBigNumber();
    return { $$type: 'CalculateDistributionChunk' as const, nextItemIndex: _nextItemIndex, chunkSize: _chunkSize, portion: _portion };
}

function storeTupleCalculateDistributionChunk(source: CalculateDistributionChunk) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.nextItemIndex);
    builder.writeNumber(source.chunkSize);
    builder.writeNumber(source.portion);
    return builder.build();
}

function dictValueParserCalculateDistributionChunk(): DictionaryValue<CalculateDistributionChunk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCalculateDistributionChunk(src)).endCell());
        },
        parse: (src) => {
            return loadCalculateDistributionChunk(src.loadRef().beginParse());
        }
    }
}

export type InitDistributionMap = {
    $$type: 'InitDistributionMap';
    nextItemIndex: bigint;
    chunkSize: bigint;
}

export function storeInitDistributionMap(src: InitDistributionMap) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1342, 32);
        b_0.storeUint(src.nextItemIndex, 256);
        b_0.storeUint(src.chunkSize, 16);
    };
}

export function loadInitDistributionMap(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1342) { throw Error('Invalid prefix'); }
    const _nextItemIndex = sc_0.loadUintBig(256);
    const _chunkSize = sc_0.loadUintBig(16);
    return { $$type: 'InitDistributionMap' as const, nextItemIndex: _nextItemIndex, chunkSize: _chunkSize };
}

function loadTupleInitDistributionMap(source: TupleReader) {
    const _nextItemIndex = source.readBigNumber();
    const _chunkSize = source.readBigNumber();
    return { $$type: 'InitDistributionMap' as const, nextItemIndex: _nextItemIndex, chunkSize: _chunkSize };
}

function loadGetterTupleInitDistributionMap(source: TupleReader) {
    const _nextItemIndex = source.readBigNumber();
    const _chunkSize = source.readBigNumber();
    return { $$type: 'InitDistributionMap' as const, nextItemIndex: _nextItemIndex, chunkSize: _chunkSize };
}

function storeTupleInitDistributionMap(source: InitDistributionMap) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.nextItemIndex);
    builder.writeNumber(source.chunkSize);
    return builder.build();
}

function dictValueParserInitDistributionMap(): DictionaryValue<InitDistributionMap> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeInitDistributionMap(src)).endCell());
        },
        parse: (src) => {
            return loadInitDistributionMap(src.loadRef().beginParse());
        }
    }
}

export type InitExchangerJettonWallets = {
    $$type: 'InitExchangerJettonWallets';
    address: Address;
    balance: bigint;
    addressOld: Address;
    balanceOld: bigint;
}

export function storeInitExchangerJettonWallets(src: InitExchangerJettonWallets) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2000, 32);
        b_0.storeAddress(src.address);
        b_0.storeCoins(src.balance);
        b_0.storeAddress(src.addressOld);
        b_0.storeCoins(src.balanceOld);
    };
}

export function loadInitExchangerJettonWallets(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2000) { throw Error('Invalid prefix'); }
    const _address = sc_0.loadAddress();
    const _balance = sc_0.loadCoins();
    const _addressOld = sc_0.loadAddress();
    const _balanceOld = sc_0.loadCoins();
    return { $$type: 'InitExchangerJettonWallets' as const, address: _address, balance: _balance, addressOld: _addressOld, balanceOld: _balanceOld };
}

function loadTupleInitExchangerJettonWallets(source: TupleReader) {
    const _address = source.readAddress();
    const _balance = source.readBigNumber();
    const _addressOld = source.readAddress();
    const _balanceOld = source.readBigNumber();
    return { $$type: 'InitExchangerJettonWallets' as const, address: _address, balance: _balance, addressOld: _addressOld, balanceOld: _balanceOld };
}

function loadGetterTupleInitExchangerJettonWallets(source: TupleReader) {
    const _address = source.readAddress();
    const _balance = source.readBigNumber();
    const _addressOld = source.readAddress();
    const _balanceOld = source.readBigNumber();
    return { $$type: 'InitExchangerJettonWallets' as const, address: _address, balance: _balance, addressOld: _addressOld, balanceOld: _balanceOld };
}

function storeTupleInitExchangerJettonWallets(source: InitExchangerJettonWallets) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.address);
    builder.writeNumber(source.balance);
    builder.writeAddress(source.addressOld);
    builder.writeNumber(source.balanceOld);
    return builder.build();
}

function dictValueParserInitExchangerJettonWallets(): DictionaryValue<InitExchangerJettonWallets> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeInitExchangerJettonWallets(src)).endCell());
        },
        parse: (src) => {
            return loadInitExchangerJettonWallets(src.loadRef().beginParse());
        }
    }
}

export type OMCollection$Data = {
    $$type: 'OMCollection$Data';
    owner: Address;
    exchanger: Address | null;
    staticTax: bigint;
    lockedValue: bigint;
    nextItemIndex: bigint;
    collectionContent: Cell;
    itemContentUrlPrefix: string;
    royalty: RoyaltyParams;
}

export function storeOMCollection$Data(src: OMCollection$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.exchanger);
        b_0.storeCoins(src.staticTax);
        b_0.storeCoins(src.lockedValue);
        const b_1 = new Builder();
        b_1.storeUint(src.nextItemIndex, 256);
        b_1.storeRef(src.collectionContent);
        b_1.storeStringRefTail(src.itemContentUrlPrefix);
        const b_2 = new Builder();
        b_2.store(storeRoyaltyParams(src.royalty));
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadOMCollection$Data(slice: Slice) {
    const sc_0 = slice;
    const _owner = sc_0.loadAddress();
    const _exchanger = sc_0.loadMaybeAddress();
    const _staticTax = sc_0.loadCoins();
    const _lockedValue = sc_0.loadCoins();
    const sc_1 = sc_0.loadRef().beginParse();
    const _nextItemIndex = sc_1.loadUintBig(256);
    const _collectionContent = sc_1.loadRef();
    const _itemContentUrlPrefix = sc_1.loadStringRefTail();
    const sc_2 = sc_1.loadRef().beginParse();
    const _royalty = loadRoyaltyParams(sc_2);
    return { $$type: 'OMCollection$Data' as const, owner: _owner, exchanger: _exchanger, staticTax: _staticTax, lockedValue: _lockedValue, nextItemIndex: _nextItemIndex, collectionContent: _collectionContent, itemContentUrlPrefix: _itemContentUrlPrefix, royalty: _royalty };
}

function loadTupleOMCollection$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _exchanger = source.readAddressOpt();
    const _staticTax = source.readBigNumber();
    const _lockedValue = source.readBigNumber();
    const _nextItemIndex = source.readBigNumber();
    const _collectionContent = source.readCell();
    const _itemContentUrlPrefix = source.readString();
    const _royalty = loadTupleRoyaltyParams(source);
    return { $$type: 'OMCollection$Data' as const, owner: _owner, exchanger: _exchanger, staticTax: _staticTax, lockedValue: _lockedValue, nextItemIndex: _nextItemIndex, collectionContent: _collectionContent, itemContentUrlPrefix: _itemContentUrlPrefix, royalty: _royalty };
}

function loadGetterTupleOMCollection$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _exchanger = source.readAddressOpt();
    const _staticTax = source.readBigNumber();
    const _lockedValue = source.readBigNumber();
    const _nextItemIndex = source.readBigNumber();
    const _collectionContent = source.readCell();
    const _itemContentUrlPrefix = source.readString();
    const _royalty = loadGetterTupleRoyaltyParams(source);
    return { $$type: 'OMCollection$Data' as const, owner: _owner, exchanger: _exchanger, staticTax: _staticTax, lockedValue: _lockedValue, nextItemIndex: _nextItemIndex, collectionContent: _collectionContent, itemContentUrlPrefix: _itemContentUrlPrefix, royalty: _royalty };
}

function storeTupleOMCollection$Data(source: OMCollection$Data) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.exchanger);
    builder.writeNumber(source.staticTax);
    builder.writeNumber(source.lockedValue);
    builder.writeNumber(source.nextItemIndex);
    builder.writeCell(source.collectionContent);
    builder.writeString(source.itemContentUrlPrefix);
    builder.writeTuple(storeTupleRoyaltyParams(source.royalty));
    return builder.build();
}

function dictValueParserOMCollection$Data(): DictionaryValue<OMCollection$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeOMCollection$Data(src)).endCell());
        },
        parse: (src) => {
            return loadOMCollection$Data(src.loadRef().beginParse());
        }
    }
}

export type OM$Data = {
    $$type: 'OM$Data';
    owner: Address;
    staticTax: bigint;
    lockedValue: bigint;
    initialized: boolean;
    collection: Address;
    itemIndex: bigint;
    individualContent: Cell;
}

export function storeOM$Data(src: OM$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeCoins(src.staticTax);
        b_0.storeCoins(src.lockedValue);
        b_0.storeBit(src.initialized);
        b_0.storeAddress(src.collection);
        const b_1 = new Builder();
        b_1.storeUint(src.itemIndex, 256);
        b_1.storeRef(src.individualContent);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadOM$Data(slice: Slice) {
    const sc_0 = slice;
    const _owner = sc_0.loadAddress();
    const _staticTax = sc_0.loadCoins();
    const _lockedValue = sc_0.loadCoins();
    const _initialized = sc_0.loadBit();
    const _collection = sc_0.loadAddress();
    const sc_1 = sc_0.loadRef().beginParse();
    const _itemIndex = sc_1.loadUintBig(256);
    const _individualContent = sc_1.loadRef();
    return { $$type: 'OM$Data' as const, owner: _owner, staticTax: _staticTax, lockedValue: _lockedValue, initialized: _initialized, collection: _collection, itemIndex: _itemIndex, individualContent: _individualContent };
}

function loadTupleOM$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _staticTax = source.readBigNumber();
    const _lockedValue = source.readBigNumber();
    const _initialized = source.readBoolean();
    const _collection = source.readAddress();
    const _itemIndex = source.readBigNumber();
    const _individualContent = source.readCell();
    return { $$type: 'OM$Data' as const, owner: _owner, staticTax: _staticTax, lockedValue: _lockedValue, initialized: _initialized, collection: _collection, itemIndex: _itemIndex, individualContent: _individualContent };
}

function loadGetterTupleOM$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _staticTax = source.readBigNumber();
    const _lockedValue = source.readBigNumber();
    const _initialized = source.readBoolean();
    const _collection = source.readAddress();
    const _itemIndex = source.readBigNumber();
    const _individualContent = source.readCell();
    return { $$type: 'OM$Data' as const, owner: _owner, staticTax: _staticTax, lockedValue: _lockedValue, initialized: _initialized, collection: _collection, itemIndex: _itemIndex, individualContent: _individualContent };
}

function storeTupleOM$Data(source: OM$Data) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeNumber(source.staticTax);
    builder.writeNumber(source.lockedValue);
    builder.writeBoolean(source.initialized);
    builder.writeAddress(source.collection);
    builder.writeNumber(source.itemIndex);
    builder.writeCell(source.individualContent);
    return builder.build();
}

function dictValueParserOM$Data(): DictionaryValue<OM$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeOM$Data(src)).endCell());
        },
        parse: (src) => {
            return loadOM$Data(src.loadRef().beginParse());
        }
    }
}

 type OMCollection_init_args = {
    $$type: 'OMCollection_init_args';
    owner: Address;
    collectionContent: Tep64TokenData;
    itemContentUrlPrefix: string;
    royalty: RoyaltyParams | null;
}

function initOMCollection_init_args(src: OMCollection_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.store(storeTep64TokenData(src.collectionContent));
        const b_1 = new Builder();
        b_1.storeStringRefTail(src.itemContentUrlPrefix);
        if (src.royalty !== null && src.royalty !== undefined) { b_1.storeBit(true); b_1.store(storeRoyaltyParams(src.royalty)); } else { b_1.storeBit(false); }
        b_0.storeRef(b_1.endCell());
    };
}

async function OMCollection_init(owner: Address, collectionContent: Tep64TokenData, itemContentUrlPrefix: string, royalty: RoyaltyParams | null) {
    const __code = Cell.fromHex('b5ee9c7241025901001361000114ff00f4a413f4bcf2c80b0102016202200462d0eda2edfb01d072d721d200d200fa4021103450666f04f86102f862db3c0be302702ad74920c21fe30001c00001c121b05503051b01e2098020d7217021d749c21f9430d31f309131e282105fcc3d14ba8ed210795516db3cc87f01ca00559050a9cf165007206e95307001cb0192cf16e25005fa025003fa0201c8cbff12ccc85003cf16c958ccc8431350545023810101cf00810101cf0001cf16c958ccc901ccc9ed54e05f0a04000605a50504e4310ad31f21810bb8bae30221810bb9ba8f5c313a09fa40013182009471f84252a0c705f2f4076ef2e6a01079551670db3cf84270830670136d6d50436d03c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00e021c003061c150a01f6313a09d33fd3fffa40fa40fa00c821cf16c916151443306c1610df10ce10bd10ac109b108a107910681067db3cc87f01ca00559050a9cf165007206e95307001cb0192cf16e25005fa025003fa0201c8cbff12ccc85003cf16c958ccc8431350545023810101cf00810101cf0001cf16c958ccc901ccc9ed54db310703f0f8416f24303256108200c35302216e925b7092c705e2f2f48200c35153f3a012bef2f410af109e108d107c106b105f104e103d4cbedb3c559170db3c53ba705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d0707f8306c86f00016f8c6d6f8c311c0802fe6f2201c993216eb396016f2259ccc9e831051115050411130403111203021111020111140159c8555082105fcc3d145007cb1f15cb3f5003cf1601cf16216eb3957f01ca00cc947032ca00e201fa0201d0cf16c9106e105d104c103f40ba1036453304c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf818a0e090020e2f400c901fb0049170605504408431304dc8f59313a09d33ffa40596c2181242af8421ac70519f2f41079551670db3cf84270830670136d6d50436d03c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00e0218210e535b616bae302218210693d3950ba1c150b1001f0313a09d33ffa40fa40fa00c821cf16c9151443306c1510ce10bd10ac109b108a1079106810571056db3cc87f01ca00559050a9cf165007206e95307001cb0192cf16e25005fa025003fa0201c8cbff12ccc85003cf16c958ccc8431350545023810101cf00810101cf0001cf16c958ccc901ccc9ed54db310c03e2f8416f24303256108200c35302c705f2f48200c35153e3a012bef2f42a10af109e108d107c06105f104e103d4c0bdb3c559170db3c53ba705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d0707f8306c86f00016f8c6d6f8c311c0d02fe6f2201c993216eb396016f2259ccc9e831051115050411140403111303021112020111110159c8555082105fcc3d145007cb1f15cb3f5003cf1601cf16216eb3957f01ca00cc947032ca00e201fa0201d0cf16c9106f105e104d103c40ba1036453304c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf818a0e0f001a58cf8680cf8480f400f400cf81001ee2f400c901fb0007a449154383161404fc8ee6313a09d33f0131108a10791068105710461035443012db3cc87f01ca00559050a9cf165007206e95307001cb0192cf16e25005fa025003fa0201c8cbff12ccc85003cf16c958ccc8431350545023810101cf00810101cf0001cf16c958ccc901ccc9ed54db31e021821048a60907bae302218210d53276dbbae302211112161800bcf8427080407054347627c855308210a8cb00ad5005cb1f13cb3fcb0f01fa0201cf16c91034413010246d50436d03c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0002b4313a09d33ffa40d2000198d307d401d0126f02916de201d2000193d401d0916de201d401d0d200018e12810101d700810101d700fa4055206c136f0392306de2151443306c1510ce10bd10ac109b108a1079106810571056db3c131502f68200c353f842561001c705f2f4226eb38e183901206ef2d0806f22c85902cb07c858cf16c901ccc950889132e2206eb3983706206ef2d080069130e2206eb39b6c33206ef2d0806f2355129130e2559170db3c708306700ec8018210d53276db58cb1fcb3fc9104d41301e10246d50436d03c8cf8580ca00cf84401c140056ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0010795516009cc87f01ca00559050a9cf165007206e95307001cb0192cf16e25005fa025003fa0201c8cbff12ccc85003cf16c958ccc8431350545023810101cf00810101cf0001cf16c958ccc901ccc9ed54db3101cc313a09d33f0131108a10791068105710461035443012db3cc87f01ca00559050a9cf165007206e95307001cb0192cf16e25005fa025003fa0201c8cbff12ccc85003cf16c958ccc8431350545023810101cf00810101cf0001cf16c958ccc901ccc9ed54db311701aa559070db3c707083060dc8018210d53276db58cb1fcb3fc92c0450ee146d50436d4133c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0055081c02f682101509a420ba8ee6313a09fa000131108a10791068105710461035443012db3cc87f01ca00559050a9cf165007206e95307001cb0192cf16e25005fa025003fa0201c8cbff12ccc85003cf16c958ccc8431350545023810101cf00810101cf0001cf16c958ccc901ccc9ed54db31e0218210946a98b6bae3020b191a003c388200c353f84252b0c705f2f4f8428010c8cb05ce70cf0b6ec98042fb0001f2313a09d33f0131c8018210aff90f5758cb1fcb3fc9108a10791068105710461035443012f84201706ddb3cc87f01ca00559050a9cf165007206e95307001cb0192cf16e25005fa025003fa0201c8cbff12ccc85003cf16c958ccc8431350545023810101cf00810101cf0001cf16c958ccc901ccc9ed54db314103ea8f45391079551670db3cf84270830670136d6d50436d03c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00e009f90182f0158e394e7cc73a9aeb362957fe037665588aef16f3bd68580c13ab84097cf22abae3025f0af2c0821c1d1e0032f8416f24135f03f8276f1001a129a05389a0b60901a070fb020098c87f01ca00559050a9cf165007206e95307001cb0192cf16e25005fa025003fa0201c8cbff12ccc85003cf16c958ccc8431350545023810101cf00810101cf0001cf16c958ccc901ccc9ed5401a410795516db3cc87f01ca00559050a9cf165007206e95307001cb0192cf16e25005fa025003fa0201c8cbff12ccc85003cf16c958ccc8431350545023810101cf00810101cf0001cf16c958ccc901ccc9ed541f00f0f8416f2410235f032a8200c35302c705f2f48200c352f8276f105389a0bcf2f426c300965367a070fb02de7083067022c8018210d53276db58cb1fcb3fc92d553010246d50436d03c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00020120214d02012022270215b8b5ddb3c5519db3c6ca1855230104db3c2402643171c86f00016f8c6d6f8c26db3c02d012db3c6f2201c993216eb396016f2259ccc9e831d0c85902cb07c858cf16c901ccc925250104db3c2600ba20d74a21d7499720c20022c200b18e4a036f22807f22cf31ab02a105ab025155b60820c2009c20aa0215d7185033cf164014de596f025341a1c20099c8016f025044a1aa028e123133c20099d430d020d74a21d749927020e2e2e85f03020120282e020148292b0211afce6d9e6d9e3650c0552a0002270211af6bed9e6d9e3651c0552c0104db3c2d00065472100215b4f47b678aa13b678d9430552f0104db3c3001708200c4185317b9f2f4db3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d0310126f8280188c87001ca005a59cf16810101cf00c9320114ff00f4a413f4bcf2c80b33020162344403f6d0eda2edfb01d072d721d200d200fa4021103450666f04f86102f862ed44d0d200018e1dfa40fa00fa00d200fa40d401d0d3ffd430102710261025102410236c178ea8fa40810101d7005902d10170820afaf080708200c353f8425260c705f2f4f8428816104510344130e208925f08e026d749c21fe30006f9014c354204f006d31f2182105fcc3d14ba8ece31d33ffa40fa40d2000191d4926d01e2fa00c821cf16c916151443306c1610ac109b108a10791068db3cc87f01ca0055605076cf165004fa0258fa02ca0001cf1602c8cbffccc901ccc9ed54db31e02182102fcb26a2bae302218210d53276dbbae3022182101509a420ba36393b3e03f4f8416f24308200c3513324be12f2f48200c35353e1c705f2f4535ac0008e1f383a288200c3530bc7051af2f48200c419226eb3f2f401206ef2d0807f4669923430e221c200935b3239e30d555170db3c708306700ac8018210d53276db58cb1fcb3fc9104b41301a10246d50436d03c8cf8580ca00cf8440ce01373d3800b470715447f3c85520821005138d915004cb1f12cb3f01cf1601d0cf16c9104541301d146d50436d5033c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0008004efa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb005514016631d33f01311057104610354430db3cc87f01ca0055605076cf165004fa0258fa02ca0001cf1602c8cbffccc901ccc9ed54db313a01dcf8416f2410235f0310685e341037487870db3c7083067f543a45c8552082108b7717355004cb1f12cb3fcbff01cf16c9104b41301a10246d50436d03c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0055143d016631d33f01311057104610354430db3cc87f01ca0055605076cf165004fa0258fa02ca0001cf1602c8cbffccc901ccc9ed54db313c01aa556070db3c707083060ac8018210d53276db58cb1fcb3fc9290450bb146d50436d4133c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0055053d0032f8416f24135f03f8276f1001a127a05367a0b60901a070fb0202828eb331fa0001311057104610354430db3cc87f01ca0055605076cf165004fa0258fa02ca0001cf1602c8cbffccc901ccc9ed54db31e0018210946a98b6bae302063f40003c368200c353f8425280c705f2f4f8428010c8cb05ce70cf0b6ec98042fb00018ad33f0131c8018210aff90f5758cb1fcb3fc91057104610354430f84201706ddb3cc87f01ca0055605076cf165004fa0258fa02ca0001cf1602c8cbffccc901ccc9ed54db314100a06d6d226eb3995b206ef2d0806f22019132e21024700304804250231036552212c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0001a682f0158e394e7cc73a9aeb362957fe037665588aef16f3bd68580c13ab84097cf22aba8ea810465513db3cc87f01ca0055605076cf165004fa0258fa02ca0001cf1602c8cbffccc901ccc9ed54e05f07f2c0824300f0f8416f2410235f03278200c35302c705f2f48200c352f8276f105367a0bcf2f424c300965345a070fb02de7083067022c8018210d53276db58cb1fcb3fc92a553010246d50436d03c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00020120454702adbe3ce76a268690000c70efd207d007d0069007d206a00e869ffea1808138813081288120811b60bc7547d20408080eb802c816880b841057d784038410061a9fc2129306382f97a7c21440b0822881a2098716d9e3638c4c46000225020120484b02adb8fcfed44d0d200018e1dfa40fa00fa00d200fa40d401d0d3ffd430102710261025102410236c178ea8fa40810101d7005902d10170820afaf080708200c353f8425260c705f2f4f8428816104510344130e2db3c6c7584c490104db3c4a000a547312539302adbb95aed44d0d200018e1dfa40fa00fa00d200fa40d401d0d3ffd430102710261025102410236c178ea8fa40810101d7005902d10170820afaf080708200c353f8425260c705f2f4f8428816104510344130e2db3c6c7184c5800000201204e540201204f520211b60b7b679b678d947055500104db3c5100065475490211b7c21b679b678d943055530002280211bb95adb3cdb3c6ca18555802f6ed44d0d200018e3efa4020d70b01c30093fa40019472d7216de201fa00fa00d401d0d3ffd4d401d001d430d0810101d700810101d700fa40552033106a106910681067586c1a8eb3fa40d307d401d01202d401d0d401d001d200018e12810101d700810101d700fa4055206c136f0392306de21025102405d155035657009c6d70820afaf08081016f285087c85902cb07c858cf16c901ccc9246eb3993803206ef2d0806f23983452107a50091059e28200c41a5db9f2f48200c41a22c200f2f41079104810371056104510340002e20008f8276f108c451d35');
    const builder = beginCell();
    builder.storeUint(0, 1);
    initOMCollection_init_args({ $$type: 'OMCollection_init_args', owner, collectionContent, itemContentUrlPrefix, royalty })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

export const OMCollection_errors = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    11: { message: `'Unknown' error` },
    12: { message: `Fatal error` },
    13: { message: `Out of gas error` },
    14: { message: `Virtualization error` },
    32: { message: `Action list is invalid` },
    33: { message: `Action list is too long` },
    34: { message: `Action is invalid or not supported` },
    35: { message: `Invalid source address in outbound message` },
    36: { message: `Invalid destination address in outbound message` },
    37: { message: `Not enough Toncoin` },
    38: { message: `Not enough extra currencies` },
    39: { message: `Outbound message does not fit into a cell after rewriting` },
    40: { message: `Cannot process a message` },
    41: { message: `Library reference is null` },
    42: { message: `Library change action error` },
    43: { message: `Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree` },
    50: { message: `Account state size exceeded limits` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid standard address` },
    138: { message: `Not a basechain address` },
    1696: { message: `Cannot change the exchanger` },
    9258: { message: `Only owner can change collection owner` },
    38001: { message: `Only owner can update exchanger` },
} as const

export const OMCollection_errors_backward = {
    "Stack underflow": 2,
    "Stack overflow": 3,
    "Integer overflow": 4,
    "Integer out of expected range": 5,
    "Invalid opcode": 6,
    "Type check error": 7,
    "Cell overflow": 8,
    "Cell underflow": 9,
    "Dictionary error": 10,
    "'Unknown' error": 11,
    "Fatal error": 12,
    "Out of gas error": 13,
    "Virtualization error": 14,
    "Action list is invalid": 32,
    "Action list is too long": 33,
    "Action is invalid or not supported": 34,
    "Invalid source address in outbound message": 35,
    "Invalid destination address in outbound message": 36,
    "Not enough Toncoin": 37,
    "Not enough extra currencies": 38,
    "Outbound message does not fit into a cell after rewriting": 39,
    "Cannot process a message": 40,
    "Library reference is null": 41,
    "Library change action error": 42,
    "Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree": 43,
    "Account state size exceeded limits": 50,
    "Null reference exception": 128,
    "Invalid serialization prefix": 129,
    "Invalid incoming message": 130,
    "Constraints error": 131,
    "Access denied": 132,
    "Contract stopped": 133,
    "Invalid argument": 134,
    "Code of a contract was not found": 135,
    "Invalid standard address": 136,
    "Not a basechain address": 138,
    "Cannot change the exchanger": 1696,
    "Only owner can change collection owner": 9258,
    "Only owner can update exchanger": 38001,
} as const

const OMCollection_types: ABIType[] = [
    {"name":"DataSize","header":null,"fields":[{"name":"cells","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bits","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"refs","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounceable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"MessageParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"DeployParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"init","type":{"kind":"simple","type":"StateInit","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"BasechainAddress","header":null,"fields":[{"name":"hash","type":{"kind":"simple","type":"int","optional":true,"format":257}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Excesses","header":3576854235,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"GetRoyaltyParams","header":1765620048,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ReportRoyaltyParams","header":2831876269,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"numerator","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"denominator","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"NFTTransfer","header":1607220500,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}},{"name":"responseDestination","type":{"kind":"simple","type":"address","optional":false}},{"name":"customPayload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forwardAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forwardPayload","type":{"kind":"simple","type":"cell","optional":false,"format":"remainder"}}]},
    {"name":"OwnershipAssigned","header":85167505,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"prevOwner","type":{"kind":"simple","type":"address","optional":false}},{"name":"forwardPayload","type":{"kind":"simple","type":"cell","optional":false,"format":"remainder"}}]},
    {"name":"GetStaticData","header":801842850,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ReportStaticData","header":2339837749,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"index","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"collection","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"GetNftData","header":null,"fields":[{"name":"init","type":{"kind":"simple","type":"bool","optional":false}},{"name":"index","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"collectionAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"ownerAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"individualContent","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"CollectionData","header":null,"fields":[{"name":"nextItemIndex","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"collectionContent","type":{"kind":"simple","type":"cell","optional":false}},{"name":"ownerAddress","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"RoyaltyParams","header":null,"fields":[{"name":"numerator","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"denominator","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Tep64TokenData","header":null,"fields":[{"name":"flag","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"content","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"SetStaticTax","header":352953376,"fields":[{"name":"staticTax","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"UpgradeContract","header":288003337,"fields":[{"name":"queryId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}},{"name":"responseDestination","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"MerkleProof","header":null,"fields":[{"name":"data","type":{"kind":"simple","type":"cell","optional":false}},{"name":"root","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"proof","type":{"kind":"dict","key":"uint","keyFormat":32,"value":"uint","valueFormat":256}},{"name":"proofLen","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"MintNFT","header":3845502486,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"responseDestination","type":{"kind":"simple","type":"address","optional":false}},{"name":"forwardAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forwardPayload","type":{"kind":"simple","type":"cell","optional":false,"format":"remainder"}}]},
    {"name":"MintNFTWithIndex","header":3000,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"itemIndex","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"responseDestination","type":{"kind":"simple","type":"address","optional":false}},{"name":"forwardAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forwardPayload","type":{"kind":"simple","type":"cell","optional":false,"format":"remainder"}}]},
    {"name":"UpdateCollection","header":1218840839,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"responseDestination","type":{"kind":"simple","type":"address","optional":false}},{"name":"collectionContent","type":{"kind":"simple","type":"Tep64TokenData","optional":true}},{"name":"itemContentUrlPrefix","type":{"kind":"simple","type":"string","optional":true}},{"name":"royalty","type":{"kind":"simple","type":"RoyaltyParams","optional":true}}]},
    {"name":"UpdateExchanger","header":3001,"fields":[{"name":"exchanger","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"NftItemInitForwardPayload","header":null,"fields":[{"name":"index","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"ChangeCollectionOwner","header":3,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"JettonTransferNotification","header":1935855772,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"forwardPayload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"JettonTransfer","header":260734629,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"responseDestination","type":{"kind":"simple","type":"address","optional":false}},{"name":"customPayload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forwardTonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forwardPayload","type":{"kind":"simple","type":"cell","optional":false,"format":"remainder"}}]},
    {"name":"JettonTransfer1","header":260734629,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"responseDestination","type":{"kind":"simple","type":"address","optional":false}},{"name":"customPayload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forwardTonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forwardPayload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Withdraw","header":1337,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"tokenAmount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"SetParameters","header":1338,"fields":[{"name":"newCollectionAddress","type":{"kind":"simple","type":"address","optional":true}},{"name":"newPriceInTokens","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"lastRewardDistribution","type":{"kind":"simple","type":"int","optional":true,"format":257}}]},
    {"name":"InitJettonWallet","header":1339,"fields":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}},{"name":"balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"CalculateDistribution","header":1340,"fields":[{"name":"currentBalance","type":{"kind":"simple","type":"uint","optional":true,"format":"coins"}}]},
    {"name":"CalculateDistributionChunk","header":1341,"fields":[{"name":"nextItemIndex","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"chunkSize","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"portion","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"InitDistributionMap","header":1342,"fields":[{"name":"nextItemIndex","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"chunkSize","type":{"kind":"simple","type":"uint","optional":false,"format":16}}]},
    {"name":"InitExchangerJettonWallets","header":2000,"fields":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}},{"name":"balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"addressOld","type":{"kind":"simple","type":"address","optional":false}},{"name":"balanceOld","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"OMCollection$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"exchanger","type":{"kind":"simple","type":"address","optional":true}},{"name":"staticTax","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lockedValue","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"nextItemIndex","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"collectionContent","type":{"kind":"simple","type":"cell","optional":false}},{"name":"itemContentUrlPrefix","type":{"kind":"simple","type":"string","optional":false}},{"name":"royalty","type":{"kind":"simple","type":"RoyaltyParams","optional":false}}]},
    {"name":"OM$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"staticTax","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lockedValue","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"initialized","type":{"kind":"simple","type":"bool","optional":false}},{"name":"collection","type":{"kind":"simple","type":"address","optional":false}},{"name":"itemIndex","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"individualContent","type":{"kind":"simple","type":"cell","optional":false}}]},
]

const OMCollection_opcodes = {
    "ChangeOwner": 2174598809,
    "ChangeOwnerOk": 846932810,
    "Deploy": 2490013878,
    "DeployOk": 2952335191,
    "FactoryDeploy": 1829761339,
    "Excesses": 3576854235,
    "GetRoyaltyParams": 1765620048,
    "ReportRoyaltyParams": 2831876269,
    "NFTTransfer": 1607220500,
    "OwnershipAssigned": 85167505,
    "GetStaticData": 801842850,
    "ReportStaticData": 2339837749,
    "SetStaticTax": 352953376,
    "UpgradeContract": 288003337,
    "MintNFT": 3845502486,
    "MintNFTWithIndex": 3000,
    "UpdateCollection": 1218840839,
    "UpdateExchanger": 3001,
    "ChangeCollectionOwner": 3,
    "JettonTransferNotification": 1935855772,
    "JettonTransfer": 260734629,
    "JettonTransfer1": 260734629,
    "Withdraw": 1337,
    "SetParameters": 1338,
    "InitJettonWallet": 1339,
    "CalculateDistribution": 1340,
    "CalculateDistributionChunk": 1341,
    "InitDistributionMap": 1342,
    "InitExchangerJettonWallets": 2000,
}

const OMCollection_getters: ABIGetter[] = [
    {"name":"get_exchanger","methodId":114192,"arguments":[],"returnType":{"kind":"simple","type":"address","optional":true}},
    {"name":"get_collection_data","methodId":102491,"arguments":[],"returnType":{"kind":"simple","type":"CollectionData","optional":false}},
    {"name":"get_nft_address_by_index","methodId":92067,"arguments":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"get_nft_content","methodId":68445,"arguments":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"individualContent","type":{"kind":"simple","type":"cell","optional":false}}],"returnType":{"kind":"simple","type":"cell","optional":false}},
    {"name":"royalty_params","methodId":85719,"arguments":[],"returnType":{"kind":"simple","type":"RoyaltyParams","optional":false}},
    {"name":"tonBalance","methodId":129370,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"staticTax","methodId":83868,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
]

export const OMCollection_getterMapping: { [key: string]: string } = {
    'get_exchanger': 'getGetExchanger',
    'get_collection_data': 'getGetCollectionData',
    'get_nft_address_by_index': 'getGetNftAddressByIndex',
    'get_nft_content': 'getGetNftContent',
    'royalty_params': 'getRoyaltyParams',
    'tonBalance': 'getTonBalance',
    'staticTax': 'getStaticTax',
}

const OMCollection_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"MintNFTWithIndex"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateExchanger"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeCollectionOwner"}},
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"MintNFT"}},
    {"receiver":"internal","message":{"kind":"typed","type":"GetRoyaltyParams"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateCollection"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Excesses"}},
    {"receiver":"internal","message":{"kind":"text","text":"withdraw"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetStaticTax"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export const codeSenderAddressInvalid = 50000n;
export const codeInflowValueNotSufficient = 50001n;
export const codeBalanceNotSufficient = 50002n;
export const codeUnauthorized = 50003n;
export const codeNonceInvalid = 50004n;
export const codeNotImplemented = 50005n;
export const codeMsgValueInvalid = 50006n;
export const codeForwardPayloadInvalid = 50007n;
export const codeMerkleInvalid = 50008n;
export const codeMerkleInvalidNullCursor = 50009n;
export const codeMerkleInvalidNullRight = 50010n;
export const codeMerkleInvalidNullRoot = 50011n;
export const codeMerkleInvalidRoot = 50012n;
export const codeMerkleNotEnoughProof = 50013n;
export const codeNftIndexNotExists = 50200n;
export const codeNftCustomPayloadInvalid = 50201n;
export const codeRoyaltyNumInvalid = 50202n;

export class OMCollection implements Contract {
    
    public static readonly storageReserve = 0n;
    public static readonly errors = OMCollection_errors_backward;
    public static readonly opcodes = OMCollection_opcodes;
    
    static async init(owner: Address, collectionContent: Tep64TokenData, itemContentUrlPrefix: string, royalty: RoyaltyParams | null) {
        return await OMCollection_init(owner, collectionContent, itemContentUrlPrefix, royalty);
    }
    
    static async fromInit(owner: Address, collectionContent: Tep64TokenData, itemContentUrlPrefix: string, royalty: RoyaltyParams | null) {
        const __gen_init = await OMCollection_init(owner, collectionContent, itemContentUrlPrefix, royalty);
        const address = contractAddress(0, __gen_init);
        return new OMCollection(address, __gen_init);
    }
    
    static fromAddress(address: Address) {
        return new OMCollection(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  OMCollection_types,
        getters: OMCollection_getters,
        receivers: OMCollection_receivers,
        errors: OMCollection_errors,
    };
    
    constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: MintNFTWithIndex | UpdateExchanger | ChangeCollectionOwner | null | MintNFT | GetRoyaltyParams | UpdateCollection | Excesses | "withdraw" | SetStaticTax | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'MintNFTWithIndex') {
            body = beginCell().store(storeMintNFTWithIndex(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateExchanger') {
            body = beginCell().store(storeUpdateExchanger(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeCollectionOwner') {
            body = beginCell().store(storeChangeCollectionOwner(message)).endCell();
        }
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'MintNFT') {
            body = beginCell().store(storeMintNFT(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'GetRoyaltyParams') {
            body = beginCell().store(storeGetRoyaltyParams(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateCollection') {
            body = beginCell().store(storeUpdateCollection(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Excesses') {
            body = beginCell().store(storeExcesses(message)).endCell();
        }
        if (message === "withdraw") {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetStaticTax') {
            body = beginCell().store(storeSetStaticTax(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetExchanger(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('get_exchanger', builder.build())).stack;
        const result = source.readAddressOpt();
        return result;
    }
    
    async getGetCollectionData(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('get_collection_data', builder.build())).stack;
        const result = loadGetterTupleCollectionData(source);
        return result;
    }
    
    async getGetNftAddressByIndex(provider: ContractProvider, index: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get('get_nft_address_by_index', builder.build())).stack;
        const result = source.readAddress();
        return result;
    }
    
    async getGetNftContent(provider: ContractProvider, index: bigint, individualContent: Cell) {
        const builder = new TupleBuilder();
        builder.writeNumber(index);
        builder.writeCell(individualContent);
        const source = (await provider.get('get_nft_content', builder.build())).stack;
        const result = source.readCell();
        return result;
    }
    
    async getRoyaltyParams(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('royalty_params', builder.build())).stack;
        const result = loadGetterTupleRoyaltyParams(source);
        return result;
    }
    
    async getTonBalance(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('tonBalance', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getStaticTax(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('staticTax', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
}