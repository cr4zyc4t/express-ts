/// <reference types="@types/node" />
/// <reference types="@types/express" />

interface ErrorException extends Error {
	errno?: number;
	code?: string;
	path?: string;
	syscall?: string;
	stack?: string;
	status?: number;
}