/// <reference types="node" />
/// <reference types="express" />

interface ErrorException extends Error {
	errno?: number;
	code?: string;
	path?: string;
	syscall?: string;
	stack?: string;
	status?: number;
}